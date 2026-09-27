/**
 * 设置项的默认值注册表
 *
 * 独立成模块，避免 UI 组件与面板之间产生循环依赖
 */

/** 键 -> 默认值 */
const defaultValueMap = new Map<string, any>();

/** 被禁用的键（始终视为关闭） */
const disabledKeyList: string[] = [];

/** 注册默认值 */
export function setDefaultValue(key: string, defaultValue: any) {
  defaultValueMap.set(key, defaultValue);
}

/** 获取默认值 */
export function getDefaultValue<T = any>(key: string): T {
  return defaultValueMap.get(key);
}

/** 是否存在该键的默认值 */
export function hasDefaultValue(key: string): boolean {
  return defaultValueMap.has(key);
}

/** 标记键为禁用 */
export function addDisabledKey(key: string) {
  if (!disabledKeyList.includes(key)) {
    disabledKeyList.push(key);
  }
}

/** 该键是否被禁用 */
export function isDisabledKey(key: string): boolean {
  return disabledKeyList.includes(key);
}
