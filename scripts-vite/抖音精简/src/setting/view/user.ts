/**
 * 设置面板-用户
 *
 * 包含用户信息区域是否显示 uid
 */
import { UISwitch } from "@/setting/ui-switch";
import type { PanelContentConfig } from "@/setting/types";

export const PanelUserConfig: PanelContentConfig = {
  id: "panel-config-user",
  title: "用户",
  views: [
    {
      type: "container",
      text: "",
      views: [UISwitch("显示UID", "dy-user-addShowUserUID", true, void 0, "在用户信息区域下方显示当前用户的uid")],
    },
  ],
};
