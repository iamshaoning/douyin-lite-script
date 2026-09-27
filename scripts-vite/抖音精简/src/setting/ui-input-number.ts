/**
 * 数字输入框配置
 */
import { setDefaultValue } from "@/setting/defaults";
import type { PanelAfterAddContainer, PanelInputNumberConfig } from "@/setting/types";

/**
 * 数字输入框
 *
 * @param text 左侧文字
 * @param key 存储的键名
 * @param defaultValue 默认值
 * @param description 文字下方的描述，支持 html
 * @param changeCallback 输入后触发，返回 `true` 阻止写入存储
 * @param placeholder 占位文字，默认 `""`
 * @param afterAddToUListCallBack 添加到列表后触发，可用于调整输入框样式
 * @param valueChangeCallback 存储值之后触发
 */
export function UIInputNumber(
  text: string,
  key: string,
  defaultValue: number | string,
  description?: string,
  changeCallback?: (event: Event, value: string, valueAsNumber: number) => boolean | void,
  placeholder: string = "",
  afterAddToUListCallBack?: (viewConfig: PanelInputNumberConfig, container: PanelAfterAddContainer) => void,
  valueChangeCallback?: (event: Event, value: string, valueAsNumber: number) => void
): PanelInputNumberConfig {
  setDefaultValue(key, defaultValue);
  return {
    type: "inputNumber",
    text,
    key,
    defaultValue,
    description,
    placeholder,
    changeCallback,
    valueChangeCallback,
    afterAddToUListCallBack,
  };
}
