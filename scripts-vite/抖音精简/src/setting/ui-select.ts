/**
 * 下拉列表配置
 */
import { setDefaultValue } from "@/setting/defaults";
import type { PanelAfterAddContainer, PanelSelectConfig, PanelSelectOption } from "@/setting/types";

/**
 * 下拉列表
 *
 * @param text 左侧文字
 * @param key 存储的键名
 * @param defaultValue 默认值
 * @param data 选项列表，支持函数惰性求值
 * @param selectCallBack 选择后触发，返回 `true` 阻止写入存储
 * @param description 文字下方的描述，支持 html
 * @param valueChangeCallback 存储值之后触发
 * @param afterAddToUListCallBack 添加到列表后触发
 */
export function UISelect<T = any>(
  text: string,
  key: string,
  defaultValue: T,
  data: PanelSelectOption<T>[] | (() => PanelSelectOption<T>[]),
  selectCallBack?: (option: PanelSelectOption<T>) => boolean | void,
  description?: string,
  valueChangeCallback?: (option: PanelSelectOption<T>) => void,
  afterAddToUListCallBack?: (viewConfig: PanelSelectConfig<T>, container: PanelAfterAddContainer) => void
): PanelSelectConfig<T> {
  setDefaultValue(key, defaultValue);
  return {
    type: "select",
    text,
    key,
    defaultValue,
    data,
    description,
    selectCallBack,
    valueChangeCallback,
    afterAddToUListCallBack,
  };
}
