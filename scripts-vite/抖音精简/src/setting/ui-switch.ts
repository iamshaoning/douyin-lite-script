/**
 * 开关配置
 */
import { addDisabledKey, setDefaultValue } from "@/setting/defaults";
import type { PanelAfterAddContainer, PanelSwitchConfig } from "@/setting/types";

/**
 * 开关
 *
 * @param text 左侧文字
 * @param key 存储的键名
 * @param defaultValue 默认值，默认 `false`
 * @param clickCallBack 点击后触发，返回 `true` 阻止写入存储
 * @param description 文字下方的描述，支持 html
 * @param afterAddToUListCallBack 添加到列表后触发
 * @param disabled 是否禁用（`.execMenu` 判断时强制为关闭状态）
 * @param valueChangeCallback 存储值之后触发
 */
export function UISwitch(
  text: string,
  key: string,
  defaultValue: boolean = false,
  clickCallBack?: (event: Event, value: boolean) => boolean | void,
  description?: string,
  afterAddToUListCallBack?: (viewConfig: PanelSwitchConfig, container: PanelAfterAddContainer) => void,
  disabled?: boolean,
  valueChangeCallback?: (event: Event, value: boolean) => void
): PanelSwitchConfig {
  setDefaultValue(key, defaultValue);
  if (disabled) {
    addDisabledKey(key);
  }
  return {
    type: "switch",
    text,
    key,
    defaultValue,
    description,
    disabled,
    clickCallBack,
    valueChangeCallback,
    afterAddToUListCallBack,
  };
}
