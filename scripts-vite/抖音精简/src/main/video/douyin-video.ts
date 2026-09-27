/**
 * 单个视频页面样式注入入口
 *
 * 页面加载时注入视频页定向的屏蔽样式。
 */
import { addStyle } from "@/core/dom";
import blockCSS from "@/main/css/block.css?raw";

/**
 * 单个视频页面
 */
export const DouYinVideo = {
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
