/**
 * 抖音直播消息解码器的劫持
 *
 * 劫持 `window.__MESSAGE_INSTANCE__.decoder.decode`，在消息解码后执行过滤，
 * 命中过滤规则的消息直接返回空对象以达到屏蔽效果。
 *
 * 该解码器由抖音的 webcast SDK 在页面加载后动态创建，创建时机不可预知；SPA 内切换
 * 直播间、断线重连时解码器实例还会被重建。原先「等待固定时长、超时即放弃且不再重试」
 * 的做法，在冷启动等解码器创建较慢的场景下会直接失效，表现为「开关明明是开启的却完全
 * 不生效，重开一次才恢复」。因此这里改为常驻轮询：等待解码器出现并劫持，成功后继续看护，
 * 一旦发现 `decode` 被替换或解码器被重建就立即重新劫持。
 *
 * 同时并行开启 DOM 扫描兜底：劫持只能拦住经过 `decode` 的消息，其余消息需要在渲染后被移除。
 */
import { unsafeWindow } from "@/core/gm";
import { log } from "@/core/log";
import { DouYinLiveMessage } from "@/main/live/douyin-live-message";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";

/** 劫持标记，挂在脚本的 hook 函数上，用于判断当前 `decode` 是否已由脚本接管 */
const HOOK_FLAG = "__dyLiteHookedDecode";

/** 被劫持的解码器记录，用于卸载时还原 */
interface HookedDecoderItem {
  decoder: any;
  originDecode: (...args: any[]) => any;
  hookedDecode: (...args: any[]) => any;
}

/** 上一次安装的卸载函数，重复调用时先卸载，避免看护定时器与劫持叠加 */
let uninstallHook: (() => void) | null = null;

export const DouYinHook = {
  /**
   * 劫持消息解码函数
   */
  hookLiveMessageDecoder() {
    uninstallHook?.();
    uninstallHook = null;
    DouYinLiveMessageFilter.init();

    const getDecoder = () => {
      // @ts-expect-error 抖音把消息解码器挂在 window 上，类型系统无法识别
      return unsafeWindow["__MESSAGE_INSTANCE__"]?.decoder;
    };

    /** 已劫持的解码器 */
    const hookedDecoderList: HookedDecoderItem[] = [];

    /**
     * 尝试劫持
     * @returns 当前是否已处于劫持状态
     */
    const tryHook = (): boolean => {
      const decoder = getDecoder();
      if (decoder == null || typeof decoder !== "object" || typeof decoder.decode !== "function") {
        return false;
      }
      if (decoder.decode[HOOK_FLAG] === true) {
        // 已是脚本的 hook，无需重复处理
        return true;
      }
      // 解码器被重建、或 decode 被 SDK 换回，重新捕获原始 decode 并劫持
      const originDecode = decoder.decode;
      const hookedDecode = async function (this: any, ...args: any[]) {
        const [_, method] = args;
        const payload = await Reflect.apply(originDecode, this, args);
        try {
          const flag = await DouYinLiveMessage.execFilter(
            {
              payload: payload,
            },
            method
          );
          if (typeof flag === "boolean" && flag) {
            if (import.meta.env.DEV) {
              log.success(`过滤：`, payload);
            }
            return {};
          }
        } catch (error) {
          // 过滤出错不能牵连消息本身，按不过滤处理
          log.error("直播消息过滤失败：", error);
        }
        return payload;
      };
      Reflect.set(hookedDecode, HOOK_FLAG, true);
      decoder.decode = hookedDecode;
      hookedDecoderList.push({ decoder, originDecode, hookedDecode });
      log.success("hook live message decode success");
      return true;
    };

    if (!tryHook()) {
      log.info("等待直播消息解码器创建");
    }
    // 解码器的创建时机不可预知，且随时可能被重建，因此常驻看护
    // 标签页不可见时无人看直播，跳过轮询避免后台空跑
    const timer = setInterval(() => {
      if (document.hidden) {
        return;
      }
      tryHook();
    }, 500);

    const uninstall = () => {
      clearInterval(timer);
      for (let index = hookedDecoderList.length - 1; index >= 0; index--) {
        const { decoder, originDecode, hookedDecode } = hookedDecoderList[index];
        // 仍是脚本的 hook 才还原，避免覆盖 SDK 后续设置的新 decode
        if (decoder.decode === hookedDecode) {
          decoder.decode = originDecode;
        }
        hookedDecoderList.splice(index, 1);
      }
      if (uninstallHook === uninstall) {
        uninstallHook = null;
      }
    };
    uninstallHook = uninstall;

    return [
      uninstall,
      // DOM 扫描兜底与劫持并行常驻，接住未经过 decode 的消息
      ...DouYinLiveMessage.filterMessage(),
    ];
  },
};
