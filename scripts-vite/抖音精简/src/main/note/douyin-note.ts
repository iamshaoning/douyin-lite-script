/**
 * 图文笔记页面样式注入入口
 *
 * 页面加载时注入笔记页定向的屏蔽样式。
 */
import { addStyle } from "@/core/dom";
import blockCSS from "@/main/css/block.css?raw";

export const DouYinNote = {
  /** 是否已初始化，避免每次路由变化重复注入样式 */
  $inited: false,
  init() {
    if (this.$inited) {
      return;
    }
    this.$inited = true;
    addStyle(blockCSS);
  },
};
