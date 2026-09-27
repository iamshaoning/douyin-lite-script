/**
 * 油猴 API 统一出口
 *
 * 业务代码只依赖本文件，不直接 import `ViteGM`，
 * 便于将来更换宿主实现或增加降级兜底。
 */
export {
  GM_addValueChangeListener,
  GM_getValue,
  GM_info,
  GM_registerMenuCommand,
  GM_removeValueChangeListener,
  GM_setValue,
  unsafeWindow,
} from "ViteGM";

/** 脚本名称，用于日志前缀、面板标题、菜单命令前缀 */
export const SCRIPT_NAME = "抖音精简";
