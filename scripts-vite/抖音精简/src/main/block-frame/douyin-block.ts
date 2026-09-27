/**
 * 抖音页面区块屏蔽总入口
 *
 * 依次初始化左侧导航栏、顶部导航栏以及区块屏蔽适配模块。
 */
import { BlockLeftNavigator } from "@/main/block-frame/block-left-navigator";
import { BlockTopNavigator } from "@/main/block-frame/block-top-navigator";
import { DouYinBlockAdaptation } from "@/main/block-frame/douyin-block-adaptation";

export const DouYinBlock = {
  init() {
    BlockLeftNavigator.init();
    BlockTopNavigator.init();
    DouYinBlockAdaptation.init();
  },
};
