/**
 * 设置面板-视频
 *
 * 包含清晰度选择、暂停弹窗监听、文案复制、评论时间跳转、点赞等数量显示，
 * 以及播放器右侧工具栏的布局屏蔽
 */
import { UISelect } from "@/setting/ui-select";
import { UISwitch } from "@/setting/ui-switch";
import type { PanelContentConfig } from "@/setting/types";

export const PanelVideoConfig: PanelContentConfig = {
  id: "panel-config-video",
  title: "视频",
  views: [
    {
      text: "",
      type: "container",
      views: [
        UISelect<number>(
          "清晰度",
          "dy-video-chooseVideoDefinition",
          -2,
          [
            { text: "超清 4K", value: -2 },
            { text: "超清 2K", value: -1 },
            { text: "高清 1080P", value: 1 },
            { text: "高清 720P", value: 2 },
            { text: "标清 540P", value: 3 },
            { text: "极速", value: 4 },
            { text: "智能", value: 0 },
            { text: "无", value: -999 },
          ],
          void 0,
          "自行选择清晰度，切换后需刷新或等待播放器重新加载"
        ),
        UISwitch(
          "监听并关闭【长时间无操作，已暂停播放】弹窗",
          "dy-video-waitToRemovePauseDialog",
          true,
          void 0,
          "自动监听并检测弹窗"
        ),
        UISwitch("解除视频文案复制限制", "dy-video-allowSelectTitleText"),
        UISwitch("评论区时间可跳转", "dy-video-commentTimeJump"),
        UISwitch("显示点赞、评论、收藏、分享的具体数量", "dy-video-showLikeCommentCollectShareCount"),
      ],
    },
    {
      text: "",
      type: "container",
      views: [
        {
          text: "布局屏蔽-播放器右侧工具栏",
          type: "deepMenu",
          views: [
            {
              type: "container",
              text: "",
              views: [
                UISwitch("【屏蔽】切换播放↑↓", "dy-video-shieldPlaySwitchButton"),
                UISwitch("【屏蔽】AI抖音", "dy-video-blockAIDouYin"),
                UISwitch("【屏蔽】听抖音", "dy-video-shieldListenDouYinButton"),
                UISwitch("【屏蔽】看相关", "dy-video-shieldRelatedRecommendationsButton"),
                UISwitch("【屏蔽】“…”按钮", "dy-video-shieldMoreButton"),
              ],
            },
          ],
        },
      ],
    },
  ],
};
