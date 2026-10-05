/**
 * 设置面板-直播
 *
 * 包含清晰度、网页全屏、暂停弹窗、在线观众数，以及「布局屏蔽-聊天室」与「聊天室消息过滤器」两个深层菜单
 */
import { VideoQualityMap } from "@/main/live/douyin-live";
import { PanelLiveMessageFilterViews } from "@/setting/view/live-message-filter";
import { UISelect } from "@/setting/ui-select";
import { UISwitch } from "@/setting/ui-switch";
import type { PanelContentConfig } from "@/setting/types";

export const PanelLiveConfig: PanelContentConfig = {
  id: "panel-config-live",
  title: "直播",
  views: [
    {
      text: "",
      type: "container",
      views: [
        UISelect<string>(
          "清晰度",
          "live-chooseQuality",
          "origin",
          (() => {
            return Object.keys(VideoQualityMap).map((key: string) => {
              const item = VideoQualityMap[key];
              return {
                value: key,
                text: item.label,
              };
            });
          })(),
          void 0,
          "自行选择清晰度"
        ),
        UISwitch(
          "自动进入网页全屏",
          "live-autoEnterElementFullScreen",
          false,
          void 0,
          "网页加载完毕后自动点击网页全屏按钮进入全屏"
        ),
        UISwitch(
          "监听并关闭【长时间无操作，已暂停播放】弹窗",
          "live-waitToRemovePauseDialog",
          true,
          void 0,
          "自动监听并检测弹窗"
        ),
        UISwitch("显示直播间在线观众具体人数", "dy-live-showLiveRoomAudienceCount", false),
      ],
    },
    {
      text: "",
      type: "container",
      views: [
        {
          type: "deepMenu",
          text: "布局屏蔽-聊天室",
          views: [
            {
              type: "container",
              text: "",
              views: [
                UISwitch("【屏蔽】贵宾席", "live-shieldChatRoomVipSeats"),
                UISwitch("【屏蔽】用户等级图标", "dy-live-shieldUserLevelIcon"),
                UISwitch("【屏蔽】VIP图标", "dy-live-shieldUserVIPIcon"),
                UISwitch("【屏蔽】粉丝牌", "dy-live-shieldUserFansIcon"),
              ],
            },
            {
              type: "container",
              text: "",
              views: [
                UISwitch(
                  "【屏蔽】信息播报",
                  "dy-live-shieldMessage",
                  false,
                  void 0,
                  "顶部左右滚动播报（xxx进入/加入了直播间），底部滚动播报（xxx来了，xxx给主播点赞）"
                ),
                UISwitch(
                  "【屏蔽】底部遮挡区域",
                  "dy-live-blockBottomArea",
                  true,
                  void 0,
                  "该元素会遮挡部分聊天信息，导致显示不全"
                ),
              ],
            },
          ],
        },
        {
          type: "deepMenu",
          text: "聊天室消息过滤器",
          views: PanelLiveMessageFilterViews,
        },
      ],
    },
  ],
};
