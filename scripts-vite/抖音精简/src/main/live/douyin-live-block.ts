/**
 * 直播页面的元素屏蔽
 *
 * 负责屏蔽聊天室的信息播报、底部遮挡区域，以及视频区域内的底部礼物栏。
 */
import { addBlockCSS, addStyle, removeStyle, waitNode } from "@/core/dom";
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
      // 改用徽章容器的 background-image 作为标记，避免只命中某一种徽章而漏屏蔽；
      // 徽章不一定是 div（可能是 span/img 等），因此不能把标记元素限定为 div。
      // 另外有的徽章用 `background` 简写而非 `background-image`，补一条 `/enter` 路径的匹配
      '#chatroom > div > div > div:has([style*="background-image"])',
      '#chatroom > div > div > div:has([style*="/enter"])'
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
    Panel.execMenuOnce("live-shieldGiftColumn", () => {
      return this.shieldGiftColumn();
    });
  },
  /**
   * 【屏蔽】底部的礼物栏
   *
   * 礼物栏在不同端与不同版本里的容器结构各不相同，需分别命中。
   * `#BottomLayout` 是整个底部区域，多机位直播时不能整体隐藏，因此等页面出现「多机位」
   * 后给它打标记，改为只隐藏礼物栏本身。
   */
  shieldGiftColumn() {
    const result: (HTMLStyleElement | undefined | (() => void))[] = [
      addBlockCSS(
        'div[data-e2e="living-container"] [id^="living_room_player_container"] > :last-child:has(.gitBarOptimizeEnabled)',
        'div[data-e2e="living-container"] > div > div:has(> pace-island > .gitBarOptimizeEnabled)',
        'div[data-e2e="living-container"] xg-controls > div:has(div[data-e2e="gifts-container"]):not(:has(video))',
        "#BottomLayout:not([data-multi-camera])",
        ".douyin-player .douyin-player-controls > div:nth-child(2):has(> .gitBarOptimizeEnabled)",
        '[data-e2e="living-container"] > div div:has(> pace-island > .gitBarOptimizeEnabled)'
      ),
      // 礼物栏被移除后，上方工具栏的 bottom 偏移会留下空白
      addStyle(/*css*/ `
        div[data-e2e="living-container"] xg-controls xg-inner-controls:has(+ div div[data-e2e="gifts-container"]) {
          bottom: 0 !important;
        }
      `),
    ];

    /** 是否已卸载，避免等待结束后又注入样式 */
    let disposed = false;
    let $bottomLayout: HTMLElement | null = null;
    let multiCameraStyle: HTMLStyleElement | undefined;

    waitNode("#BottomLayout:contains('多机位')", 10000).then(($el) => {
      if (disposed || $el == null) {
        return;
      }
      $bottomLayout = $el;
      $bottomLayout.setAttribute("data-multi-camera", "true");
      multiCameraStyle = addBlockCSS("#BottomLayout[data-multi-camera] .gitBarOptimizeEnabled");
    });

    result.push(() => {
      disposed = true;
      $bottomLayout?.removeAttribute("data-multi-camera");
      $bottomLayout = null;
      removeStyle(multiCameraStyle);
      multiCameraStyle = undefined;
    });

    return result;
  },
};
