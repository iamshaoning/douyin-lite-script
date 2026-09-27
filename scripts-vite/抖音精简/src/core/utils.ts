/**
 * 通用工具函数
 *
 * 完全不依赖第三方库，仅使用浏览器原生能力实现。
 */

/** 空值判断，多个参数全部为空时才算空 */
export function isNull(...args: unknown[]): boolean {
  for (const obj of args) {
    let flag = false;
    if (obj === null || obj === undefined) {
      flag = true;
    } else {
      switch (typeof obj) {
        case "object":
          if (typeof (obj as Iterable<unknown>)[Symbol.iterator] === "function") {
            if (obj instanceof Map) {
              flag = obj.size === 0;
            } else {
              const length = (obj as { length?: number }).length;
              if (typeof length === "number") {
                flag = length === 0;
              }
            }
          } else if (String(obj) === "[object Object]") {
            flag = Object.keys(obj).length === 0;
          }
          break;
        case "number":
          flag = isNaN(obj) || obj === 0;
          break;
        case "string": {
          const trimStr = obj.trim();
          flag = trimStr === "" || trimStr === "null" || trimStr === "undefined";
          break;
        }
        case "boolean":
          flag = !obj;
          break;
        case "function": {
          const funcStr = obj.toString().replace(/\s/g, "");
          flag = Boolean(funcStr.match(/^\(.*?\)=>\{\}$|^function.*?\(.*?\)\{\}$/));
          break;
        }
        default:
          flag = false;
      }
    }
    if (!flag) {
      return false;
    }
  }
  return true;
}

/** 防抖 */
export function debounce<T extends (...args: any[]) => any>(callback: T, delay = 0) {
  let timeId: ReturnType<typeof setTimeout> | undefined;
  return function (this: unknown, ...args: Parameters<T>) {
    if (timeId != null) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      callback.apply(this, args);
    }, delay);
  };
}

/** 复制文本到剪贴板 */
export async function copy(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // 忽略异常，降级至 execCommand
  }
  try {
    const $textarea = document.createElement("textarea");
    $textarea.value = text;
    $textarea.setAttribute("style", "position:fixed;top:-9999px;left:-9999px;opacity:0;");
    document.body.appendChild($textarea);
    $textarea.select();
    const result = document.execCommand("copy");
    $textarea.remove();
    return result;
  } catch {
    return false;
  }
}

/** React 实例（DOM 元素上的 `__reactXXX$XXX` 属性） */
interface ReactInstance {
  reactFiber?: any;
  reactContainer?: any;
  reactProps?: any;
  reactEvents?: any;
  reactEventHandlers?: any;
  [key: string]: any;
}

/**
 * 获取元素上的 React 实例
 *
 * 元素的 `__reactFiber$xxx` 一类的属性会被解析为 `reactFiber` 键
 */
export function getReactInstance(element: Element | HTMLElement | null | undefined): ReactInstance {
  const result: ReactInstance = {};
  if (element == null) {
    return result;
  }
  Object.keys(element).forEach((domPropsName) => {
    if (!domPropsName.startsWith("__react")) {
      return;
    }
    const propsName = domPropsName.replace(/__(.+)\$.+/i, "$1");
    if (propsName in result) {
      return;
    }
    Reflect.set(result, propsName, Reflect.get(element, domPropsName));
  });
  return result;
}

/** `queryProperty` 的处理函数返回值 */
interface QueryPropertyResult<R> {
  /** 是否已找到目标值 */
  isFind: boolean;
  /** 未找到时，作为下一层查找的节点；找到时为目标值 */
  data: R;
}

/**
 * 在对象树中查找符合条件的数据
 *
 * handler 返回 `{ isFind: true, data: 目标值 }` 时结束查找
 */
export function queryProperty<T = any>(target: any, handler: (target: any) => QueryPropertyResult<any>): T | undefined {
  // 改用迭代 + 环检测：React Fiber 存在 `return` 回指，递归版本遇到环会栈溢出
  const visited = new Set<any>();
  let current = target;
  while (current != null) {
    if (visited.has(current)) {
      return undefined;
    }
    visited.add(current);
    const result = handler(current);
    if (result == null) {
      return undefined;
    }
    if (result.isFind) {
      return result.data as T;
    }
    current = result.data;
  }
  return undefined;
}

/** MutationObserver 配置 */
interface MutationObserverOption {
  /** 触发回调 */
  callback: (mutations: MutationRecord[], observer: MutationObserver) => void;
  /** observe 的配置 */
  config?: MutationObserverInit;
  /** 是否立即执行一次回调 */
  immediate?: boolean;
  /** 是否只触发一次 */
  once?: boolean;
}

/**
 * 创建 MutationObserver
 *
 * 支持传入元素、元素数组、Document
 */
export function mutationObserver(
  target: Node | Node[] | NodeList | null | undefined,
  option: MutationObserverOption
): MutationObserver | undefined {
  const MutationObserverApi = window.MutationObserver;
  if (MutationObserverApi == null || target == null) {
    return undefined;
  }
  const config: MutationObserverOption = {
    callback: option.callback,
    config: option.config,
    immediate: option.immediate ?? false,
    once: option.once ?? false,
  };
  const handler = (mutations: MutationRecord[], observer: MutationObserver) => {
    if (config.once) {
      observer.disconnect();
    }
    config.callback(mutations, observer);
  };
  const observer = new MutationObserverApi(handler);
  const targetList: Node[] =
    target instanceof NodeList || Array.isArray(target) ? Array.from(target as Node[]) : [target as Node];
  targetList.forEach(($el) => {
    observer.observe($el, config.config);
  });
  if (config.immediate) {
    handler([], observer);
  }
  return observer;
}

/** 可手动断开的观察者 */
interface DisconnectableObserver {
  disconnect: () => void;
}

/**
 * 按 CSS 选择器观察 DOM 变动
 *
 * 目标节点由前端框架动态挂载，可能尚未渲染：未命中时先在根节点上等待其出现，
 * 命中后只观察目标节点本身。相比直接观察整个文档，回调触发频率可大幅降低。
 *
 * @param selectors CSS 选择器
 * @param option observe 配置（等待阶段固定使用 `{ childList: true, subtree: true }`）
 */
export function mutationObserverBySelector(
  selectors: string | string[],
  option: MutationObserverOption
): DisconnectableObserver | undefined {
  const MutationObserverApi = window.MutationObserver;
  if (MutationObserverApi == null || document.documentElement == null) {
    return undefined;
  }
  const selectorList = Array.isArray(selectors) ? selectors : [selectors];
  let targetObserver: MutationObserver | undefined;
  /** 断开对目标节点的观察 */
  const disconnectTarget = () => {
    targetObserver?.disconnect();
    targetObserver = undefined;
  };
  /** 观察当前已渲染的目标节点，返回是否已命中 */
  const observeTarget = () => {
    const $nodeList: Element[] = [];
    selectorList.forEach((selector) => {
      $nodeList.push(...document.querySelectorAll(selector));
    });
    if ($nodeList.length === 0) {
      return false;
    }
    disconnectTarget();
    targetObserver = mutationObserver($nodeList, option);
    return true;
  };
  if (observeTarget()) {
    return { disconnect: disconnectTarget };
  }
  // 目标节点尚未渲染，先在根节点上等待其出现
  const rootObserver = mutationObserver(document.documentElement, {
    config: { childList: true, subtree: true },
    callback: () => {
      if (observeTarget()) {
        rootObserver?.disconnect();
      }
    },
  });
  return {
    disconnect() {
      rootObserver?.disconnect();
      disconnectTarget();
    },
  };
}

/**
 * 间隔轮询等待条件成立
 *
 * 无论成功还是超时，Promise 都会 resolve（超时后由调用方自行判断结果）
 */
export function waitPropertyByInterval(
  getTarget: () => any,
  checkFn: (inst: any) => boolean,
  intervalTimer = 250,
  maxTime = -1
): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const inst = getTarget();
      if (inst == null || typeof inst !== "object") {
        return;
      }
      if (checkFn(inst)) {
        clearInterval(interval);
        resolve();
      }
    }, intervalTimer);
    if (maxTime !== -1) {
      setTimeout(() => {
        clearInterval(interval);
        resolve();
      }, maxTime);
    }
  });
}

/**
 * 函数锁：防止同一个函数在上一次执行完成前被重复调用
 */
export class LockFunction {
  #flag = false;
  #delayTime: number;
  #context: any;
  #callback: (...args: any[]) => any;
  #timeId: ReturnType<typeof setTimeout> | undefined;

  constructor(callback: (...args: any[]) => any, delayTime?: number);
  constructor(callback: (...args: any[]) => any, context: any, delayTime?: number);
  constructor(callback: (...args: any[]) => any, ...args: any[]) {
    this.#callback = callback;
    if (args.length <= 1) {
      this.#context = null;
      this.#delayTime = (args[0] as number) ?? 0;
    } else {
      this.#context = args[0];
      this.#delayTime = (args[1] as number) ?? 0;
    }
  }

  /** 上锁 */
  lock() {
    this.#flag = true;
    if (this.#timeId != null) {
      clearTimeout(this.#timeId);
    }
  }

  /** 解锁（延迟 delayTime 后才允许再次执行） */
  unlock() {
    this.#timeId = setTimeout(() => {
      this.#flag = false;
    }, this.#delayTime);
  }

  /** 是否已上锁 */
  isLock() {
    return this.#flag;
  }

  /** 执行（已上锁时直接返回） */
  async run(...args: any[]) {
    if (this.isLock()) {
      return;
    }
    this.lock();
    try {
      await this.#callback.apply(this.#context, args);
    } finally {
      this.unlock();
    }
  }
}

/** 工具函数集合 */
export const utils = {
  isNull,
  debounce,
  copy,
  getReactInstance,
  queryProperty,
  mutationObserver,
  mutationObserverBySelector,
  waitPropertyByInterval,
  LockFunction,
};
