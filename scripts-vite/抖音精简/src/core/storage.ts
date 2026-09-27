/**
 * 基于油猴存储 API 的键值存储
 *
 * 所有键值统一存放在一个 GM 键下的对象中，避免污染宿主存储空间；
 * 同时监听该 GM 键的变化，实现多标签页之间的数据同步。
 */
import { GM_addValueChangeListener, GM_getValue, GM_removeValueChangeListener, GM_setValue } from "@/core/gm";

type ValueChangeCallback = (key: string, newValue: any, oldValue: any) => void;

type ListenerItem = {
  id: number;
  key: string;
  callback: ValueChangeCallback;
};

export class GMStorage {
  /** 存储的键名 */
  readonly storageKey: string;
  /** 缓存的数据 */
  #cacheData: Record<string, any> | null = null;
  /** 已注册的监听 */
  #listeners = new Map<string, ListenerItem[]>();
  /** 取消 GM 键监听的函数 */
  #cancelCallbackList: (() => void)[] = [];
  #listenerIdSeed = 0;

  constructor(key: string) {
    const trimKey = String(key).trim();
    if (trimKey === "") {
      throw new Error("storage key can not be empty string");
    }
    this.storageKey = trimKey;
  }

  /** 获取本地存储的对象 */
  #getLocalValue(): Record<string, any> {
    if (this.#cacheData != null) {
      return this.#cacheData;
    }
    let localValue = GM_getValue<Record<string, any> | null>(this.storageKey, null);
    if (localValue == null || typeof localValue !== "object") {
      localValue = {};
      GM_setValue(this.storageKey, localValue);
    }
    this.#cancelListener();
    this.#cacheData = localValue;
    const listenerId = GM_addValueChangeListener(this.storageKey, (_name, _oldValue, newValue) => {
      this.#cacheData = newValue ?? {};
    });
    this.#cancelCallbackList.push(() => {
      GM_removeValueChangeListener(listenerId);
    });
    return this.#cacheData;
  }

  /** 写入本地存储的对象 */
  #setLocalValue(value: Record<string, any>) {
    this.#cacheData = value;
    GM_setValue(this.storageKey, value);
  }

  /** 取消 GM 键的监听，释放缓存 */
  #cancelListener() {
    this.#cacheData = null;
    for (let index = this.#cancelCallbackList.length - 1; index >= 0; index--) {
      this.#cancelCallbackList[index]();
      this.#cancelCallbackList.splice(index, 1);
    }
  }

  /** 设置值 */
  set(key: string, value: any) {
    const oldValue = this.get(key);
    const localValue = this.#getLocalValue();
    Reflect.set(localValue, key, value);
    this.#setLocalValue(localValue);
    this.#emitValueChangeListenerAsync(key, value, oldValue);
  }

  /** 获取值 */
  get<T = any>(key: string, defaultValue?: T): T {
    const localValue = this.#getLocalValue();
    return (Reflect.get(localValue, key) ?? defaultValue) as T;
  }

  /**
   * 监听值的改变（仅监听本实例的 `set`）
   * @returns 监听 id，可用于移除监听
   */
  addValueChangeListener(key: string, callback: ValueChangeCallback): number {
    const listenerId = ++this.#listenerIdSeed;
    const listenerList = this.#listeners.get(key) ?? [];
    listenerList.push({ id: listenerId, key, callback });
    this.#listeners.set(key, listenerList);
    return listenerId;
  }

  /**
   * 移除监听
   * @param listenerId 监听 id 或键名
   */
  removeValueChangeListener(listenerId: number | string): boolean {
    let flag = false;
    for (const [key, listenerList] of this.#listeners) {
      for (let index = listenerList.length - 1; index >= 0; index--) {
        const item = listenerList[index];
        const isMatch =
          (typeof listenerId === "string" && item.key === listenerId) ||
          (typeof listenerId === "number" && item.id === listenerId);
        if (isMatch) {
          listenerList.splice(index, 1);
          flag = true;
        }
      }
      this.#listeners.set(key, listenerList);
    }
    return flag;
  }

  /** 主动触发监听器 */
  emitValueChangeListener(key: string, newValue?: any, oldValue?: any) {
    const listenerList = this.#listeners.get(key);
    if (listenerList == null) {
      return;
    }
    for (const item of [...listenerList]) {
      item.callback(key, newValue, oldValue);
    }
  }

  /**
   * 异步派发值改变回调
   *
   * 放到下一个宏任务，让调用方（如开关点击）先返回、界面先完成渲染，
   * 避免监听回调中大量的 DOM/样式操作阻塞交互
   */
  #emitValueChangeListenerAsync(key: string, newValue?: any, oldValue?: any) {
    if (this.#listeners.get(key) == null) {
      return;
    }
    setTimeout(() => {
      this.emitValueChangeListener(key, newValue, oldValue);
    }, 0);
  }
}
