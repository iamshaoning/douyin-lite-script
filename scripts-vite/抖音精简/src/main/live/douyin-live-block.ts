/**
 * 直播聊天室的元素屏蔽
 *
 * 负责屏蔽聊天室的信息播报与底部遮挡区域。
 */
import { addBlockCSS, addStyle } from "@/core/dom";
import { Panel } from "@/setting/panel";

const DouYinLiveBlock_ChatRoom = {
  init() {
    Panel.execMenuOnce("live-shieldChatRoomVipSeats", () => {
      return this.shieldChatRoomVipSeats();
    });
    Panel.execMenuOnce("dy-live-shieldUserLevelIcon", () => {
      return this.shieldUserLevelIcon();
    });
    Panel.execMenuOnce("dy-live-shieldUserVIPIcon", () => {
      return this.shieldUserVIPIcon();
    });
    Panel.execMenuOnce("dy-live-shieldUserFansIcon", () => {
      return this.shieldUserFansIcon();
    });
    Panel.execMenuOnce("dy-live-shieldMessage", () => {
      return this.shieldMessage();
    });
    Panel.execMenuOnce("dy-live-blockBottomArea", () => {
      return this.blockBottomArea();
    });
  },
  /**
   * 【屏蔽】贵宾席
   *
   * 聊天室顶部的贵宾/在线观众面板。容器结构随版本变化，这里覆盖三种形态：
   * 以 `#audiencePanelScrollId` 或 `data-e2e="live-room-audience"` 标记的容器，
   * 以及外层为 `pace-island` 自定义元素的新结构。
   */
  shieldChatRoomVipSeats() {
    return addBlockCSS(
      "#chatroom > div > div:has(#audiencePanelScrollId)",
      '#chatroom > div > div:has([data-e2e="live-room-audience"])',
      '#chatroom > pace-island > div > div:has([data-e2e="live-room-audience"])'
    );
  },
  /**
   * 【屏蔽】用户等级图标
   *
   * 等级图标有多个来源，需分别命中：普通消费等级（`level`）、等级增益（`aweme_grade_buff`）、联赛（`league`）
   */
  shieldUserLevelIcon() {
    return addBlockCSS(
      '#chatroom .webcast-chatroom___item *:has(>img[src*="level"])',
      '#chatroom .webcast-chatroom___item *:has(>img[src*="aweme_grade_buff"])',
      '#chatroom .webcast-chatroom___item *:has(>img[src*="league"])'
    );
  },
  /**
   * 【屏蔽】VIP图标
   */
  shieldUserVIPIcon() {
    return addBlockCSS('#chatroom .webcast-chatroom___item *:has(>img[src*="subscribe"])');
  },
  /**
   * 【屏蔽】粉丝牌
   *
   * 粉丝牌有两种渲染方式：图片（`img[src*="fansclub"]`）与带 `fansclub` 背景样式的 div，需分别命中
   */
  shieldUserFansIcon() {
    return addBlockCSS(
      '#chatroom .webcast-chatroom___item span:has(>div[style*="fansclub"])',
      '#chatroom .webcast-chatroom___item *:has(>img[src*="fansclub"])'
    );
  },
  /**
   * 【屏蔽】信息播报
   *
   * 顶部左右滚动播报（xxx进入/加入了直播间）、底部滚动播报（xxx来了，xxx给主播点赞、xxx等N人来了）
   *
   * 抖音的类名命名不统一，播报存在三种互不重叠的结构，需分别命中：
   * + 底部横幅容器 `webcast-chatroom___bottom-message`（连字符）
   * + 容器内的单条「xxx 来了」`webcast-chatroom___bottom_message`（下划线）
   * + 挂在列表条目上的「xxx 等 N 人来了」`webcast-chatroom__room-message`
   */
  shieldMessage() {
    return addBlockCSS(
      // 底部的滚动播报容器
      "#chatroom .webcast-chatroom___bottom-message",
      // 底部的单条「xxx 来了」，容器类名变化时的兜底
      "#chatroom .webcast-chatroom___bottom_message",
      // 「xxx 等 N 人来了」的批量进入播报
      "#chatroom .webcast-chatroom__room-message",
      // 上面的滚动播报，xxx进入/加入了直播间
      // 横幅左侧的徽章会随用户身份变化（荣誉等级 enter_honor_level、粉丝团 fansclub_effect_badge 等），
      // 改用徽章容器的 background-image 作为标记，避免只命中某一种徽章而漏屏蔽
      '#chatroom > div > div > div:has(div[style*="background-image"])'
    );
  },
  /**
   * 【屏蔽】底部遮挡区域
   */
  blockBottomArea() {
    return addStyle(/*css*/ `
      .webcast-chatroom___list{
        clip-path: none !important;
      }
    `);
  },
};

export const DouYinLiveBlock = {
  init() {
    DouYinLiveBlock_ChatRoom.init();
  },
};
