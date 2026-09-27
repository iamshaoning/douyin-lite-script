/**
 * DOM 操作
 *
 * 仅实现脚本实际用到的能力，选择器额外支持末尾伪类：
 * + `:contains("文本")` 元素的文本内容包含指定文本
 * + `:regexp("正则")` 元素的文本内容匹配指定正则
 * + `:empty` 元素既没有文本内容也没有子元素
 */
import { mutationObserver } from "@/core/utils";

/* -------------------------------------------------- 选择器 -------------------------------------------------- */

/** 解析后的选择器 */
interface ParsedSelector {
  /** 剥离伪类后的标准选择器 */
  css: string;
  /** 文本包含 */
  contains?: string;
  /** 正则匹配 */
  regexp?: RegExp;
  /** 是否为空元素 */
  empty?: boolean;
}

const CONTAINS_END_REG = /[^\s]:contains\((["'])([\s\S]*)\1\)$/;
const REGEXP_END_REG = /[^\s]:regexp\((["'])([\s\S]*)\1\)$/;
const EMPTY_END_REG = /[^\s]:empty$/;

/**
 * 解析选择器上的自定义伪类（仅支持末尾形式）
 *
 * 返回 `null` 表示选择器非法或无法用于查询
 */
function parseSelector(selector: string): ParsedSelector | null {
  if (typeof selector !== "string") {
    return null;
  }
  let css = selector.trim();
  if (css === "") {
    return null;
  }
  const result: ParsedSelector = { css: "" };
  let hasMatched = true;
  while (hasMatched) {
    hasMatched = false;
    const containsMatch = css.match(CONTAINS_END_REG);
    if (containsMatch) {
      result.contains = containsMatch[2];
      css = css.replace(CONTAINS_END_REG, "");
      hasMatched = true;
      continue;
    }
    const regexpMatch = css.match(REGEXP_END_REG);
    if (regexpMatch) {
      try {
        result.regexp = new RegExp(regexpMatch[2]);
      } catch {
        return null;
      }
      css = css.replace(REGEXP_END_REG, "");
      hasMatched = true;
      continue;
    }
    if (EMPTY_END_REG.test(css)) {
      result.empty = true;
      css = css.replace(EMPTY_END_REG, "");
      hasMatched = true;
    }
  }
  css = css.trim();
  if (css === "") {
    return null;
  }
  result.css = css;
  return result;
}

/** 判断元素是否满足选择器上附带的文本伪类 */
function checkSelectorFilter($el: Element, parsed: ParsedSelector): boolean {
  if (parsed.empty && $el.innerHTML.trim() !== "") {
    return false;
  }
  if (parsed.contains == null && parsed.regexp == null) {
    return true;
  }
  const domText = $el.textContent ?? ($el as HTMLElement).innerText;
  if (typeof domText !== "string") {
    return false;
  }
  if (parsed.contains != null && !domText.includes(parsed.contains)) {
    return false;
  }
  if (parsed.regexp != null && !parsed.regexp.test(domText)) {
    return false;
  }
  return true;
}

/** 元素查找范围 */
type DOMUtilsParent = Element | Document | DocumentFragment | ShadowRoot;

/**
 * 选择器查询单个元素
 */
export function selector<E extends Element = HTMLElement>(selector: string, parent?: DOMUtilsParent): E | undefined {
  return selectorAll<E>(selector, parent)[0];
}

/**
 * 选择器查询多个元素
 */
function selectorAll<E extends Element = HTMLElement>(selector: string, parent?: DOMUtilsParent): E[] {
  const parsed = parseSelector(selector);
  if (parsed == null) {
    return [];
  }
  const $parent = parent ?? document;
  let $list: E[];
  try {
    $list = Array.from($parent.querySelectorAll<E>(parsed.css));
  } catch {
    return [];
  }
  if (parsed.contains == null && parsed.regexp == null && !parsed.empty) {
    return $list;
  }
  return $list.filter(($el) => checkSelectorFilter($el, parsed));
}

/** DOMUtils.selector 的别名 */
export const $ = selector;

/** DOMUtils.selectorAll 的别名 */
export const $$ = selectorAll;

/**
 * 判断元素是否匹配选择器
 */
function matches($el: Element | null | undefined, selector: string): boolean {
  if ($el == null || !($el instanceof Element)) {
    return false;
  }
  const parsed = parseSelector(selector);
  if (parsed == null) {
    return false;
  }
  if (!$el.matches(parsed.css)) {
    return false;
  }
  return checkSelectorFilter($el, parsed);
}

/**
 * 向上查找匹配选择器的元素
 */
function closest<E extends Element = Element>($el: Element | null | undefined, selector: string): E | null {
  if ($el == null || !($el instanceof Element)) {
    return null;
  }
  const parsed = parseSelector(selector);
  if (parsed == null) {
    return null;
  }
  const $closest = $el.closest<E>(parsed.css);
  if ($closest == null) {
    return null;
  }
  return checkSelectorFilter($closest, parsed) ? $closest : null;
}

/* -------------------------------------------------- 元素操作 -------------------------------------------------- */

/**
 * 创建元素
 *
 * @param tagName 标签名
 * @param property 直接赋值到元素上的属性（如 `className`、`innerHTML`）
 * @param attributes 通过 `setAttribute` 设置的属性（如 `style`、`data-*`）
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  property?: string | Record<string, any>,
  attributes?: Record<string, any>
): HTMLElementTagNameMap[K];
export function createElement(
  tagName: string,
  property?: string | Record<string, any>,
  attributes?: Record<string, any>
): HTMLElement;
export function createElement(
  tagName: string,
  property?: string | Record<string, any>,
  attributes?: Record<string, any>
): HTMLElement {
  const $el = document.createElement(tagName);
  if (typeof property === "string") {
    html($el, property);
    return $el;
  }
  Object.keys(property ?? {}).forEach((key) => {
    const value = (property as Record<string, any>)[key];
    if (key === "innerHTML") {
      html($el, value);
      return;
    }
    Reflect.set($el, key, value);
  });
  Object.keys(attributes ?? {}).forEach((key) => {
    let value = (attributes as Record<string, any>)[key];
    if (typeof value === "object") {
      value = JSON.stringify(value);
    } else if (typeof value === "function") {
      value = value.toString();
    }
    $el.setAttribute(key, value);
  });
  return $el;
}

/**
 * 获取|设置元素的文本内容
 */
export function text($el: Element | null | undefined): string;
export function text($el: Element | null | undefined, content: unknown): void;
export function text($el: Element | null | undefined, content?: unknown) {
  if ($el == null) {
    return "";
  }
  if (arguments.length === 1) {
    return $el.textContent ?? "";
  }
  $el.textContent = String(content);
}

/**
 * 获取|设置元素的 innerHTML
 */
export function html($el: Element | null | undefined): string;
export function html($el: Element | null | undefined, content: string | Element | number): void;
export function html($el: Element | null | undefined, content?: string | Element | number) {
  if ($el == null) {
    return "";
  }
  if (arguments.length === 1) {
    return $el.innerHTML;
  }
  if (content instanceof Element) {
    $el.innerHTML = "";
    $el.appendChild(content);
  } else {
    $el.innerHTML = String(content);
  }
}

/**
 * 移除元素
 */
export function remove($el: Element | null | undefined) {
  $el?.remove();
}

/**
 * 获取上一个元素兄弟节点
 */
export function prev<E extends Element = HTMLElement>($el: Element | null | undefined): E | undefined {
  return ($el?.previousElementSibling ?? undefined) as E | undefined;
}

/* -------------------------------------------------- 脚本注入的节点 -------------------------------------------------- */

/**
 * 脚本注入的根节点统一标记属性
 *
 * 业务代码在扫描页面节点（如检测弹窗）时应跳过带该属性的节点，
 * 否则脚本自己注入的提示文案会被自己扫描到，形成死循环
 */
export const SCRIPT_NODE_ATTR = "data-dy-lite";

/**
 * 元素是否属于脚本自身注入的节点
 */
export function isScriptNode($el: Element | null | undefined): boolean {
  return $el?.closest(`[${SCRIPT_NODE_ATTR}]`) != null;
}

/* -------------------------------------------------- 样式 -------------------------------------------------- */

/** `cssText` -> 已注入的样式元素 */
const styleCache = new Map<string, HTMLStyleElement>();
/** 样式元素 -> 引用计数 */
const styleRefCount = new Map<HTMLStyleElement, number>();

/**
 * 在 `head` 末尾添加一个 `<style>`
 *
 * 相同 `cssText` 已注入且仍在文档中时，直接复用，不会重复注入
 */
export function addStyle(cssText: string): HTMLStyleElement {
  if (typeof cssText !== "string") {
    throw new Error("addStyle 参数 cssText 必须为 string 类型");
  }
  const $cached = styleCache.get(cssText);
  if ($cached != null) {
    if ($cached.isConnected) {
      styleRefCount.set($cached, (styleRefCount.get($cached) ?? 1) + 1);
      return $cached;
    }
    // 已被外部移除，丢弃旧的引用计数
    styleRefCount.delete($cached);
  }
  const $style = createElement("style", {
    type: "text/css",
    innerHTML: cssText,
  });
  const $document = document;
  if ($document.head) {
    $document.head.appendChild($style);
  } else if ($document.documentElement.childNodes.length === 0) {
    $document.documentElement.appendChild($style);
  } else {
    $document.documentElement.insertBefore($style, $document.documentElement.childNodes[0]);
  }
  styleCache.set(cssText, $style);
  styleRefCount.set($style, 1);
  return $style;
}

/**
 * 移除 `addStyle` 注入的样式
 *
 * 同一份 `cssText` 可能被多处复用，引用计数归零时才真正移除；
 * 非 `addStyle` 创建的元素直接移除
 */
export function removeStyle($el: Element | null | undefined) {
  if ($el == null) {
    return;
  }
  const styleEl = $el as HTMLStyleElement;
  const count = styleRefCount.get(styleEl);
  if (count == null) {
    $el.remove();
    return;
  }
  if (count > 1) {
    styleRefCount.set(styleEl, count - 1);
    return;
  }
  styleRefCount.delete(styleEl);
  $el.remove();
}

/**
 * 添加屏蔽样式（`display: none !important`）
 *
 * 全部选择器为空时返回 `undefined`
 */
export function addBlockCSS(...args: (string | string[])[]): HTMLStyleElement | undefined {
  const selectorList: string[] = [];
  args.forEach((item) => {
    if (Array.isArray(item)) {
      selectorList.push(...item);
    } else {
      selectorList.push(item);
    }
  });
  const validList = selectorList.map((item) => item.trim()).filter((item) => item !== "");
  if (validList.length === 0) {
    return undefined;
  }
  return addStyle(`${validList.join(",\n")}{display: none !important;}`);
}

/* -------------------------------------------------- 等待 -------------------------------------------------- */

/** 等待目标类型：选择器、选择器数组、获取元素的函数 */
type WaitNodeTarget = string | string[] | (() => Element | null | undefined);

function queryWaitNodeTarget(target: WaitNodeTarget): Element | null {
  try {
    if (typeof target === "function") {
      return target() ?? null;
    }
    if (Array.isArray(target)) {
      for (const item of target) {
        const $el = selector(item);
        if ($el != null) {
          return $el;
        }
      }
      return null;
    }
    return selector(target) ?? null;
  } catch {
    return null;
  }
}

/**
 * 等待元素出现
 *
 * @param target 选择器|选择器数组|获取元素的函数
 * @param timeout 超时时间（ms），`-1` 表示不限制
 */
export function waitNode<T extends Element = HTMLElement>(target: WaitNodeTarget, timeout = -1): Promise<T | null> {
  const $immediate = queryWaitNodeTarget(target);
  if ($immediate != null) {
    return Promise.resolve($immediate as T);
  }
  return new Promise<T | null>((resolve) => {
    let observer: MutationObserver | undefined;
    let timeId: ReturnType<typeof setTimeout> | undefined;
    const finish = ($el: Element | null) => {
      observer?.disconnect();
      if (timeId != null) {
        clearTimeout(timeId);
      }
      resolve($el as T | null);
    };
    observer = mutationObserver(document.documentElement, {
      config: { childList: true, subtree: true },
      callback: () => {
        const $el = queryWaitNodeTarget(target);
        if ($el != null) {
          finish($el);
        }
      },
    });
    if (timeout !== -1) {
      timeId = setTimeout(() => {
        finish(null);
      }, timeout);
    }
  });
}

/**
 * 等待 DOM 解析完成
 */
export function onReady(): Promise<void>;
export function onReady(callback: (...args: any[]) => any): void;
export function onReady(callback?: (...args: any[]) => any) {
  if (document.readyState !== "loading") {
    if (typeof callback === "function") {
      callback();
      return;
    }
    return Promise.resolve();
  }
  if (typeof callback === "function") {
    document.addEventListener("DOMContentLoaded", () => callback(), { once: true });
    return;
  }
  return new Promise<void>((resolve) => {
    document.addEventListener("DOMContentLoaded", () => resolve(), { once: true });
  });
}

/* -------------------------------------------------- 事件 -------------------------------------------------- */

/** 事件监听配置 */
interface DOMEventListenerOption {
  /** 是否捕获，默认 `false` */
  capture?: boolean;
  /** 是否只触发一次，默认 `false` */
  once?: boolean;
  /** 是否被动，默认 `false` */
  passive?: boolean;
  /** 是否使用 `composedPath()[0]` 作为目标元素，默认 `false` */
  isComposedPath?: boolean;
  /** 是否改写 `event.target` 为匹配到的元素，默认 `true` */
  overrideTarget?: boolean;
  /** 是否阻止默认行为与传播，默认 `false` */
  isPreventEvent?: boolean;
}

/** 事件绑定目标 */
type DOMEventTarget = Window | Document | Element | Element[] | NodeList;

type DOMEventCallback = (this: Element, event: Event, $selector?: HTMLElement) => void | boolean;

function normalizeEventTarget(target: DOMEventTarget | string | null | undefined): (Element | Document | Window)[] {
  if (target == null) {
    return [];
  }
  if (typeof target === "string") {
    return selectorAll(target);
  }
  if (target instanceof NodeList || Array.isArray(target)) {
    return Array.from(target as Element[]);
  }
  return [target as Element | Document | Window];
}

/**
 * 绑定事件
 *
 * 支持子元素选择器（选择器数组时任意命中即可），回调为 `(event, $matched)`，`this` 同样为命中元素
 */
export function on(
  target: DOMEventTarget | string,
  eventType: string | string[],
  selector?: string | string[] | DOMEventCallback,
  callback?: DOMEventCallback | DOMEventListenerOption,
  option?: DOMEventListenerOption
): {
  /** 取消本次绑定的所有监听 */
  off: () => void;
} {
  const $elList = normalizeEventTarget(target);
  const eventTypeList = (Array.isArray(eventType) ? eventType : eventType.split(" "))
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter((item) => item !== "");
  let selectorList: string[] = [];
  let listenerCallBack: DOMEventCallback;
  const listenerOption: Required<DOMEventListenerOption> = {
    capture: false,
    once: false,
    passive: false,
    isComposedPath: false,
    overrideTarget: true,
    isPreventEvent: false,
  };
  if (typeof selector === "function" || selector == null) {
    listenerCallBack = (selector ?? callback) as DOMEventCallback;
    Object.assign(listenerOption, typeof callback === "object" ? callback : undefined);
  } else {
    selectorList = (Array.isArray(selector) ? selector : [selector]).filter(
      (item) => typeof item === "string" && item !== ""
    );
    listenerCallBack = callback as DOMEventCallback;
    Object.assign(listenerOption, option);
  }
  const boundList: { $el: Element | Document | Window; eventName: string; handler: (event: Event) => void }[] = [];

  $elList.forEach(($elItem) => {
    const targetIsWindow = isWinNode($elItem);
    eventTypeList.forEach((eventName) => {
      const handler = function (event: Event) {
        if (listenerOption.isPreventEvent) {
          preventEvent(event);
        }
        let callThis: Element | undefined;
        let execCallback = false;
        let matchedSelector: HTMLElement | undefined;
        if (selectorList.length) {
          const composedPath = typeof event.composedPath === "function" ? event.composedPath() : [];
          const $originTarget = (composedPath[0] ?? event.target ?? undefined) as HTMLElement | undefined;
          let $target = (listenerOption.isComposedPath ? $originTarget : (event.target as HTMLElement)) ?? undefined;
          if ($target != null) {
            const $parent = targetIsWindow ? document.documentElement : ($elItem as Element);
            const matched = selectorList.find((selectors) => {
              if (matches($target, selectors)) {
                return true;
              }
              const $closest = closest<HTMLElement>($target, selectors);
              if ($closest != null && $parent?.contains?.($closest)) {
                $target = $closest;
                return true;
              }
              return false;
            });
            if (matched) {
              if (listenerOption.overrideTarget) {
                try {
                  const originTarget = event.target;
                  Object.defineProperties(event, {
                    target: {
                      get() {
                        return $target;
                      },
                    },
                    originTarget: {
                      get() {
                        return originTarget;
                      },
                    },
                  });
                } catch {
                  // 忽略改写失败的场景
                }
              }
              execCallback = true;
              callThis = $target;
              matchedSelector = $target;
            }
          }
        } else {
          execCallback = true;
          callThis = $elItem as Element;
        }
        if (execCallback) {
          const result = listenerCallBack.call(callThis!, event, matchedSelector);
          if (listenerOption.once) {
            off();
          }
          if (typeof result === "boolean" && !result) {
            return false;
          }
        }
      };
      $elItem.addEventListener(eventName, handler, listenerOption);
      boundList.push({ $el: $elItem, eventName, handler });
    });
  });

  function off() {
    boundList.forEach((item) => {
      item.$el.removeEventListener(item.eventName, item.handler, listenerOption);
    });
    boundList.length = 0;
  }

  return { off };
}

/** 判断是否是 window 对象 */
function isWinNode(target: unknown): boolean {
  if (typeof target !== "object" || target == null) {
    return false;
  }
  return target === window || target === self || target === globalThis;
}

/**
 * 阻止事件默认行为与传播
 *
 * @param event 事件
 * @param onlyStopPropagation 为 `true` 时仅阻止传播
 */
export function preventEvent(event: Event, onlyStopPropagation = false): false | void {
  event.stopPropagation();
  event.stopImmediatePropagation();
  if (onlyStopPropagation) {
    return;
  }
  event.preventDefault();
  return false;
}

/** DOM 操作集合（仅收录业务实际以 `DOMUtils.x` 调用的能力） */
export const DOMUtils = {
  selector,
  createElement,
  text,
  html,
  remove,
  prev,
  waitNode,
  onReady,
  on,
  preventEvent,
};
