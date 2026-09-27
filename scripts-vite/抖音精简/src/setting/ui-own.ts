/**
 * 自定义视图配置
 */
import type { PanelOwnConfig } from "@/setting/types";

/**
 * 自定义视图
 *
 * @param createLIElement 创建 `<li>`，返回的元素会被添加到列表中
 */
export function UIOwn(createLIElement: ($li: HTMLLIElement) => HTMLLIElement): PanelOwnConfig {
  return {
    type: "own",
    createLIElement,
  };
}
