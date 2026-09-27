/**
 * iframe 自定义协议拦截
 *
 * 抖音的 JSBridge 会创建隐藏 iframe 并把 `src` 指向 `bytedance://...`，浏览器无法处理该协议，
 * 于是交给操作系统，弹出「获取打开此'bytedance'链接的应用」对话框。该 iframe 本来也无法加载
 * （控制台表现为 `net::ERR_ABORTED`），替换为同源的 `about:blank` 既能保留 `contentWindow`，
 * 又能避免系统弹窗。
 */
import { log } from "@/core/log";

/** 允许 iframe 直接加载的协议，其余协议会被系统当作「打开外部应用」处理 */
const ALLOWED_IFRAME_PROTOCOLS = new Set(["http:", "https:", "blob:", "data:", "about:"]);

/**
 * 提取地址的协议
 * @returns 相对地址（无协议）返回 `null`
 */
function getProtocol(url: string): string | null {
  const matched = /^\s*([a-zA-Z][a-zA-Z0-9+.-]*):/.exec(url);
  return matched == null ? null : `${matched[1].toLowerCase()}:`;
}

/**
 * 是否是会触发系统「打开外部应用」对话框的地址
 */
function isExternalProtocol(url: unknown): boolean {
  if (typeof url !== "string") {
    return false;
  }
  const protocol = getProtocol(url);
  return protocol != null && !ALLOWED_IFRAME_PROTOCOLS.has(protocol);
}

export const DouYinIFrameHook = {
  /**
   * 拦截自定义协议的 iframe
   *
   * 需要在脚本入口处尽早调用，晚于抖音的 JSBridge 初始化就会漏掉首次弹窗。
   */
  hookCustomProtocol() {
    const iframeSrcDescriptor = Object.getOwnPropertyDescriptor(HTMLIFrameElement.prototype, "src");
    if (iframeSrcDescriptor?.get == null || iframeSrcDescriptor.set == null) {
      log.warn("未找到 iframe 的 src 属性描述符，跳过自定义协议拦截");
      return;
    }
    const { get: originGet, set: originSet, enumerable } = iframeSrcDescriptor;
    const originSetAttribute = Element.prototype.setAttribute;
    Object.defineProperty(HTMLIFrameElement.prototype, "src", {
      configurable: true,
      enumerable: enumerable,
      get() {
        return Reflect.apply(originGet, this, []);
      },
      set(value: string) {
        if (isExternalProtocol(value)) {
          log.info(`拦截 iframe 自定义协议地址: ` + value);
          return Reflect.apply(originSet, this, ["about:blank"]);
        }
        return Reflect.apply(originSet, this, [value]);
      },
    });
    Element.prototype.setAttribute = function (this: Element, name: string, value: string) {
      if (this instanceof HTMLIFrameElement && name.toLowerCase() === "src" && isExternalProtocol(value)) {
        log.info(`拦截 iframe 自定义协议地址: ` + value);
        return originSetAttribute.call(this, name, "about:blank");
      }
      return originSetAttribute.call(this, name, value);
    };
  },
};
