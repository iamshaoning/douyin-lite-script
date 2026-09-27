/**
 * 抖音直播相关功能的总入口
 *
 * 负责画质切换、暂停弹窗自动关闭、直播间人数显示，以及各直播子模块的初始化。
 */
import { cookieManager } from "@/core/cookie";
import { $$, DOMUtils, isScriptNode } from "@/core/dom";
import { log } from "@/core/log";
import { toast } from "@/core/toast";
import { LockFunction, getReactInstance, mutationObserverBySelector, queryProperty } from "@/core/utils";
import { DouYinHook } from "@/main/hook/douyin-hook";
import { DouYinRouter } from "@/router/douyin-router";
import { Panel } from "@/setting/panel";
import { getDynamicValue } from "@/setting/value";
import { DouYinLiveBlock } from "@/main/live/douyin-live-block";
import { DouYinLiveBlockUid } from "@/main/live/douyin-live-block-uid";
import { DouYinLiveBlockWord } from "@/main/live/douyin-live-block-word";
import { DouYinLiveMessageFilterEntry } from "@/main/live/douyin-live-message-filter-entry";

export const VideoQualityMap: {
  [key: string]: {
    label: string;
    sign: number;
  };
} = {
  auto: {
    label: "自动",
    sign: 0,
  },
  origin: {
    label: "原画",
    sign: 5,
  },
  uhd: {
    label: "蓝光",
    sign: 4,
  },
  hd: {
    label: "超清",
    sign: 3,
  },
  sd: {
    label: "高清",
    sign: 2,
  },
  ld: {
    label: "标清",
    sign: 1,
  },
};
/**
 * 直播画质
 * webcast_local_quality
 * + ld 标清
 * + sd 高清
 * + hd 超清
 * + origin 原画
 *
 * 弹幕设置
 * DanmaSetting_GiftAndPackage
 * {
 *   "__tea_cache_tokens_随机4位数字["uuid"]_playRoom.split(",")[0]": {
 *        expired: Date.now(), # 过期时间
 *        giftOn: false, # 送礼信息
 *        packageOn: false, # 福袋口令
 *    }
 * }
 */
export const DouYinLive = {
  init() {
    DouYinLiveBlock.init();
    DOMUtils.onReady(() => {
      // 解码器劫持与聊天室 DOM 观察都绑定在当前页面上，切换直播间后需要重建，
      // 因此监听 url 变化重载（`listenUrlChange`），并在已离开直播间时直接跳过
      Panel.execMenuOnce(
        "live-danmu-shield-rule-enable",
        async () => {
          if (!DouYinRouter.isLive()) {
            return;
          }
          return DouYinHook.hookLiveMessageDecoder();
        },
        void 0,
        true
      );
      // 弹窗检测观察的是直播间容器（`#ContainerBackgroundLayout`）等节点，切换直播间后这些节点
      // 会被整体替换，观察随之失效，因此监听 url 变化重载；离开直播间后无需再处理该弹窗
      Panel.execMenuOnce(
        "live-waitToRemovePauseDialog",
        () => {
          if (!DouYinRouter.isLive()) {
            return;
          }
          return this.waitToRemovePauseDialog();
        },
        void 0,
        true
      );
      // 画质是下拉选项，用户可能在面板里改值，也可能切换直播间后需要重新设置，
      // 因此既需要监听值变化（`execMenuOnce` 会注册值监听），也需要监听 url 变化
      Panel.execMenuOnce(
        "live-chooseQuality",
        (option) => {
          if (option.value === "auto" || !DouYinRouter.isLive()) {
            return;
          }
          return this.chooseQuality(option.value);
        },
        false,
        true
      );
      // 全屏按钮随播放器渲染/替换，面板开关也需要立即生效，因此既监听值变化也监听 url 变化
      Panel.execMenuOnce(
        "live-autoEnterElementFullScreen",
        () => {
          if (!DouYinRouter.isLive()) {
            return;
          }
          return this.autoEnterElementFullScreen();
        },
        false,
        true
      );
      Panel.execMenuOnce(
        "dy-live-showLiveRoomAudienceCount",
        () => {
          if (!DouYinRouter.isLive()) {
            return;
          }
          return this.showRoomUserCount();
        },
        void 0,
        true
      );
      // 「屏蔽 TA」快捷菜单 + 聊天室划词「屏蔽该词」 + 聊天室内的过滤器快捷入口
      DouYinLiveBlockUid.init();
      DouYinLiveBlockWord.init();
      DouYinLiveMessageFilterEntry.init();
    });
  },
  /**
   * 自动进入网页全屏
   *
   * 旧版按钮是自研元素 `xg-icon.xgplayer-fullscreen`，当前版本的抖音已不再渲染该元素，
   * 全屏按钮改为 React 渲染在 `.douyin-player-controls-right` 的 slot 中，按钮文本为
   * 「窗口全屏」/「退出窗口全屏」，点击事件挂在 React 元素的 `__reactProps.onClick` 上。
   *
   * 播放器控件只在视频真实渲染后才挂载（标签页处于后台时可能长时间不渲染），SPA 内切换直播间时
   * 整个播放器还会被替换。原先「只等待一次、最长 10s、超时即放弃」的做法在这些情况下会静默失效
   * （表现为「偶尔不生效」），因此改为常驻轮询：控件出现且尚未处于网页全屏时才点击，点击后以按钮
   * 文案校验结果，未生效则做有限次重试。
   */
  autoEnterElementFullScreen() {
    /** 网页全屏按钮所在的 slot（「窗口全屏」与「退出窗口全屏」都包含「窗口全屏」文本） */
    const getButton = () =>
      $$<HTMLElement>(".douyin-player-controls-right slot").find(($slot) =>
        DOMUtils.text($slot).includes("窗口全屏")
      ) ?? null;
    /** 已点击次数 */
    let clickedCount = 0;
    /** 允许的最大点击次数：每次点击都会真正切换全屏状态，因此只做少量重试 */
    const MAX_CLICK_COUNT = 3;
    /** 上次点击的时间戳，用于给按钮文案的更新留出时间，避免连续点击导致全屏来回切换 */
    let lastClickTime = 0;
    log.info("尝试自动进入网页全屏");
    // 控件的挂载时机不可预知，切换直播间时播放器还会被替换，因此常驻轮询直到确认处于网页全屏
    // 标签页不可见时不会渲染播放器，跳过轮询避免后台空跑
    const timer = setInterval(() => {
      if (document.hidden) {
        return;
      }
      const $slot = getButton();
      // 控件尚未渲染
      if ($slot == null) {
        return;
      }
      if (DOMUtils.text($slot).includes("退出窗口全屏")) {
        if (clickedCount > 0) {
          log.success("成功自动进入网页全屏");
        } else {
          log.warn("抖音已自动进入网页全屏，不执行脚本的操作");
        }
        clearInterval(timer);
        return;
      }
      // 上次点击后按钮文案尚未更新，继续等待
      if (Date.now() - lastClickTime < 2000) {
        return;
      }
      if (clickedCount >= MAX_CLICK_COUNT) {
        log.error(`自动进入网页全屏失败，已重试 ${clickedCount} 次`);
        clearInterval(timer);
        return;
      }
      // 点击事件挂在 React 元素上，但不同按钮挂载的层级不一致（「窗口全屏」挂在 slot 内的包裹 div 上，
      // 原生全屏按钮挂在 svg 上），因此在 slot 子树中取第一个带 `onClick` 的元素作为点击目标
      const $clickable = [$slot, ...$slot.querySelectorAll<HTMLElement>("*")].find(
        ($el) => typeof getReactInstance($el).reactProps?.onClick === "function"
      );
      // props 尚未就绪
      if ($clickable == null) {
        return;
      }
      clickedCount++;
      lastClickTime = Date.now();
      $clickable.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    }, 500);
    return [
      () => {
        clearInterval(timer);
      },
    ];
  },
  /**
   * 选择画质
   *
   * 抖音直播间的画质列表渲染在 `[data-e2e="quality-selector"]` 内，每一项都是带 React `onClick`
   * 的可点击 div（事件挂在 `__reactProps` 上）。旧版依赖的 `qualityHandler.setCurrentQuality` 实例
   * 在当前版本已不存在于 Fiber 上，因此改为直接触发列表项的点击。当前生效的画质由播放器上的
   * `[data-e2e="quality"]` 按钮文本反映，用它作为设置结果的校验基准。
   *
   * 该控件只会在播放器真实渲染后才挂载（标签页处于后台时可能长时间不渲染），且 SPA 内切换直播间时
   * 整个播放器会被替换。原先「点击一次即认为成功、随即断开观察」的做法，在控件尚未渲染、或点到了
   * 即将被卸载的旧播放器时会静默失效（表现为「偶尔不生效」），因此这里改为常驻轮询：控件出现且与
   * 目标画质不一致时才点击，点击后继续校验，直到确认生效或达到点击次数上限。
   * @param quality 选择的画质，默认原画
   */
  chooseQuality(quality = "origin") {
    const chooseQualityName = (VideoQualityMap[quality] ?? VideoQualityMap.origin).label;
    window.localStorage.setItem("webcast_local_quality", quality);
    cookieManager.update({
      name: "webcast_local_quality",
      value: quality,
      domain: ".douyin.com",
    });
    cookieManager.update({
      name: "live_local_quality",
      value: quality,
      domain: ".douyin.com",
    });
    /** 画质名 -> 清晰度权重，用于目标画质不存在时挑选可用的最高画质 */
    const qualitySignMap: Record<string, number> = {};
    Object.keys(VideoQualityMap).forEach((key) => {
      qualitySignMap[VideoQualityMap[key].label] = VideoQualityMap[key].sign;
    });
    const getQualityOptions = () => $$<HTMLElement>('#PlayerLayout [data-e2e="quality-selector"] > div');
    /** 当前生效的画质名（播放器上的画质按钮文本），控件未渲染时为 `null` */
    const getCurrentQualityName = () => {
      const $quality = document.querySelector<HTMLElement>('#PlayerLayout [data-e2e="quality"]');
      return $quality == null ? null : DOMUtils.text($quality).trim();
    };
    /** 是否已提示过「当前直播没有目标画质」 */
    let hasWarned = false;
    /** 已点击次数，点击迟迟不生效（控件被替换等）时用于终止重试 */
    let clickedCount = 0;
    /** 允许的最大点击次数 */
    const MAX_CLICK_COUNT = 10;
    /**
     * 尝试设置画质
     * @returns 是否已确认生效（或已放弃重试），为真时停止轮询
     */
    const tryChooseQuality = (): boolean => {
      const currentName = getCurrentQualityName();
      // 播放器尚未渲染
      if (currentName == null) {
        return false;
      }
      const $optionList = getQualityOptions();
      if ($optionList.length === 0) {
        return false;
      }
      const nameList = $optionList.map(($el) => DOMUtils.text($el).trim());
      // 可选画质由主播端决定，目标画质不存在时退化为可用的最高画质
      let finalName = chooseQualityName;
      if (!nameList.includes(finalName)) {
        const availableNameList = nameList
          .filter((name) => qualitySignMap[name] != null)
          .sort((a, b) => qualitySignMap[a] - qualitySignMap[b]);
        finalName = availableNameList[availableNameList.length - 1] ?? nameList[0];
        if (!hasWarned) {
          hasWarned = true;
          toast.warning(`当前直播没有【${chooseQualityName}】画质，自动选择【${finalName}】`);
        }
      }
      if (currentName === finalName) {
        log.success(`成功设置画质为【${finalName}】`);
        return true;
      }
      if (clickedCount >= MAX_CLICK_COUNT) {
        log.error(`设置画质为【${finalName}】失败，已重试 ${clickedCount} 次`);
        return true;
      }
      const $target = $optionList.find(($el) => DOMUtils.text($el).trim() === finalName);
      if ($target == null) {
        return false;
      }
      clickedCount++;
      $target.click();
      return false;
    };
    log.info(`尝试将直播画质设置为【${chooseQualityName}】`);
    // 控件的挂载时机不可预知，切换直播间时整个播放器还会被替换，因此常驻轮询直到确认生效
    // 标签页不可见时不会渲染播放器，跳过轮询避免后台空跑
    const timer = setInterval(() => {
      if (document.hidden) {
        return;
      }
      if (tryChooseQuality()) {
        clearInterval(timer);
      }
    }, 500);
    return [
      () => {
        clearInterval(timer);
      },
    ];
  },
  /**
   * 长时间无操作，已暂停播放
   * 累计节能xx分钟
   */
  waitToRemovePauseDialog() {
    /** 已提示过「出现弹窗」的节点，弹窗未消失时 DOM 每次变动都会重复命中同一节点，避免提示刷屏 */
    const notifiedSet = new WeakSet<HTMLElement>();
    /** 已成功调用关闭函数的节点 */
    const closedSet = new WeakSet<HTMLElement>();
    /**
     * 检测并关闭弹窗
     * @param $el
     * @param from 检测来源
     * + "1"
     * + "2"
     */
    const checkDialogToClose = ($el: HTMLElement, from: string) => {
      // 脚本自己注入的节点（提示框、设置面板等）的文本也会包含关键词，必须跳过，否则会自我触发形成死循环
      if (isScriptNode($el)) {
        return;
      }
      const eleText = DOMUtils.text($el);
      if (eleText.includes("长时间无操作") && eleText.includes("暂停播放")) {
        if (closedSet.has($el)) {
          return;
        }
        if (!notifiedSet.has($el)) {
          notifiedSet.add($el);
          toast.info(`检测${from}：出现【长时间无操作，已暂停播放】弹窗`);
        }
        let closeDialogFn: Function | null | undefined = null;
        const $rect = getReactInstance($el);
        if (typeof $rect.reactContainer === "object" && $rect.reactContainer) {
          closeDialogFn =
            queryProperty($rect.reactContainer, (obj) => {
              // 不要用onMaskClick，该函数调用不会关闭弹窗
              if (typeof obj["onClose"] === "function") {
                return {
                  isFind: true,
                  data: obj["onClose"],
                };
              } else if (typeof obj?.["memoizedProps"]?.["onClose"] === "function") {
                return {
                  isFind: true,
                  data: obj?.["memoizedProps"]?.["onClose"],
                };
              } else {
                // 未找到，进入下一层
                return {
                  isFind: false,
                  data: obj["child"],
                };
              }
            }) || $rect?.reactContainer?.memoizedState?.element?.props?.children?.props?.onClose;
        }
        if (typeof closeDialogFn !== "function") {
          if (typeof $rect.reactFiber === "object" && $rect.reactFiber && ["3"].includes(from.toString())) {
            closeDialogFn = queryProperty($rect.reactFiber, (obj) => {
              // 不要用onMaskClick，该函数调用不会关闭弹窗
              if (typeof obj["onClose"] === "function") {
                return {
                  isFind: true,
                  data: obj["onClose"],
                };
              } else if (typeof obj?.["memoizedProps"]?.["onClose"] === "function") {
                return {
                  isFind: true,
                  data: obj?.["memoizedProps"]?.["onClose"],
                };
              } else {
                // 未找到，进入下一层
                return {
                  isFind: false,
                  data: obj["return"],
                };
              }
            });
          }
        }
        if (typeof closeDialogFn === "function") {
          closedSet.add($el);
          toast.success(`检测${from}：调用函数关闭弹窗`);
          closeDialogFn();
        }
      }
    };
    const waitToRemovePauseDialog = getDynamicValue("live-waitToRemovePauseDialog");
    // 直播页 DOM 变动频繁，加锁限频避免高频全量扫描
    const lockFn = new LockFunction(() => {
      if (!waitToRemovePauseDialog.value) {
        return;
      }
      $$<HTMLDivElement>("body > div[elementtiming='element-timing']").forEach(($elementTiming) => {
        checkDialogToClose($elementTiming, "1");
      });
      $$<HTMLDivElement>('body > div:not([id="root"]):not(:empty)').forEach(($el) => {
        checkDialogToClose($el, "2");
      });
      $$<HTMLDivElement>("#TipsLayout > div").forEach(($el) => {
        checkDialogToClose($el, "3");
      });
    }, 400);

    // 弹窗只会挂在直播间容器与 body 级浮层里，避免脚本注入、弹幕等无关变动触发扫描
    const observer = mutationObserverBySelector(
      ["#ContainerBackgroundLayout", ".semi-portal", "body > div[elementtiming='element-timing']"],
      {
        config: {
          subtree: true,
          childList: true,
        },
        immediate: true,
        callback() {
          lockFn.run();
        },
      }
    );
    return [
      () => {
        observer?.disconnect();
      },
      waitToRemovePauseDialog.destroy,
    ];
  },
  /**
   * 显示直播间具体人数
   *
   * 抖音把观众人数渲染在 `#chatroom [data-e2e="live-room-audience"]`（同容器内还有「在线观众」文案），
   * 但人数较多时其文本会被缩写为「1.2万」这类近似值；精确数值只能从 React 的 room store 读取：
   * `store.roomStore.roomInfo.room.room_view_stats.display_value`。
   * 该 store 由抖音通过 props 下发到组件（不在 DOM 节点的祖先链上），因此这里从 React 根 fiber
   * 向下做广度优先搜索定位持有它的 fiber。
   *
   * 人数节点与 store 都会随 SPA 切换直播间被整体替换，原先「一次等待 + 观察 `#chatroom`」的做法在
   * 节点被替换后观察即失效（表现为完全不生效），因此改为常驻轮询，每轮都重新定位节点与 store。
   */
  showRoomUserCount() {
    /** 从直播间容器向上找到 React 根 fiber（`__reactContainer$xxx`） */
    const getRootFiber = () => {
      let $el: Element | null = document.querySelector('[data-e2e="living-container"]');
      while ($el) {
        const { reactContainer } = getReactInstance($el);
        if (reactContainer) {
          return reactContainer.current ?? reactContainer;
        }
        $el = $el.parentElement;
      }
      return null;
    };
    /** 广度优先搜索持有直播 store 的 fiber */
    const findLiveStore = () => {
      const rootFiber = getRootFiber();
      if (rootFiber == null) {
        return null;
      }
      const queue: any[] = [rootFiber];
      const visited = new Set<any>();
      while (queue.length > 0 && visited.size < 20000) {
        const fiber = queue.shift();
        if (fiber == null || visited.has(fiber)) {
          continue;
        }
        visited.add(fiber);
        const props = fiber.memoizedProps;
        const store = props?.store ?? props?.value;
        if (store?.roomStore?.roomInfo) {
          return store;
        }
        if (fiber.child) {
          queue.push(fiber.child);
        }
        if (fiber.sibling) {
          queue.push(fiber.sibling);
        }
      }
      return null;
    };
    /** 承载观众人数的节点 */
    const getAudienceEl = () => document.querySelector<HTMLElement>('#chatroom [data-e2e="live-room-audience"]');
    /** 连续未命中的轮询次数，约 10s 都没找到时才提示一次失败（等页面渲染完成） */
    let missCount = 0;
    // 人数节点与 store 都会随切换直播间被替换，因此常驻轮询；标签页不可见时无需更新
    const timer = setInterval(() => {
      if (document.hidden) {
        return;
      }
      const $audience = getAudienceEl();
      const store = $audience == null ? null : findLiveStore();
      if ($audience == null || store == null) {
        missCount++;
        if (missCount === 20) {
          log.error("未找到直播间观众人数节点或 store，显示在线观众人数失败");
        }
        return;
      }
      missCount = 0;
      const displayValue = store.roomStore?.roomInfo?.room?.room_view_stats?.display_value;
      if (typeof displayValue !== "number") {
        return;
      }
      const text = DOMUtils.text($audience).trim();
      const newText = String(displayValue);
      // 抖音在人数变化时会重写为缩写值，不一致就改回精确值
      if (text !== newText) {
        DOMUtils.text($audience, newText);
      }
    }, 500);
    return [
      () => {
        clearInterval(timer);
      },
    ];
  },
};
