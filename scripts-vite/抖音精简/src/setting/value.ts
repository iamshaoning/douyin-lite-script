/**
 * 设置值的读写
 *
 * 独立成模块，供 UI 组件与面板共同使用，避免循环依赖
 */
import { GMStorage } from "@/core/storage";
import { getDefaultValue, hasDefaultValue } from "@/setting/defaults";

/** 存储所有设置项的键名 */
const STORAGE_KEY = "douyin-lite-setting";

/** 设置项的存储实例 */
const panelStorage = new GMStorage(STORAGE_KEY);

/** 获取值 */
export function getValue<T = any>(key: string, defaultValue?: T): T {
  const localValue = panelStorage.get<T | null>(key, null);
  if (localValue == null) {
    if (hasDefaultValue(key)) {
      return getDefaultValue<T>(key);
    }
    return defaultValue as T;
  }
  return localValue as T;
}

/** 设置值 */
export function setValue(key: string, value: any) {
  panelStorage.set(key, value);
}

/** 值改变的回调 */
type ValueChangeCallback = (key: string, newValue: any, oldValue: any) => void;

/**
 * 监听值的改变
 *
 * @param option.immediate 立即触发一次当前值改变的回调
 * @param option.immediateAll 立即触发所有监听该键的回调
 */
export function addValueChangeListener(
  key: string,
  callback: ValueChangeCallback,
  option?: { immediate?: boolean; immediateAll?: boolean }
): number {
  const listenerId = panelStorage.addValueChangeListener(key, callback);
  if (option?.immediate || option?.immediateAll) {
    const value = getValue(key);
    if (option.immediate) {
      callback(key, value, value);
    } else {
      panelStorage.emitValueChangeListener(key, value, value);
    }
  }
  return listenerId;
}

/** 移除监听 */
export function removeValueChangeListener(listenerId: number) {
  panelStorage.removeValueChangeListener(listenerId);
}

/** 获取动态值（值变化时 `.value` 自动更新） */
export function getDynamicValue<T = any>(key: string, defaultValue?: T) {
  let isInit = false;
  let __value = defaultValue;
  const listenerId = addValueChangeListener(key, (_key, newValue) => {
    __value = newValue;
  });
  return {
    get value(): T {
      if (!isInit) {
        isInit = true;
        __value = getValue<T>(key, defaultValue);
      }
      return __value as T;
    },
    /** 销毁监听 */
    destroy() {
      removeValueChangeListener(listenerId);
    },
  };
}
