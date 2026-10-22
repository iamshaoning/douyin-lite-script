/**
 * 直播页面的元素屏蔽
 *
 * 负责屏蔽聊天室的信息播报、底部遮挡区域，视频区域内的底部礼物栏，
 * 以及把贵宾席折叠为一行。
 */
import { addBlockCSS, addStyle, DOMUtils, removeStyle } from "@/core/dom";
import { DouYinRouter } from "@/router/douyin-router";
import { Panel } from "@/setting/panel";

/** 贵宾席面板容器标记 */
const VIP_PANEL_ATTR = "data-dy-vip-panel";
/** 贵宾席面板表头（折叠聊天按钮 + 在线观众数量）标记 */
const VIP_HEADER_ATTR = "data-dy-vip-header";
/** 贵宾席面板是否收起 */
const VIP_COLLAPSED_ATTR = "data-dy-vip-collapsed";

const DouYinLiveBlock_ChatRoom = {
  init() {
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
    Panel.execMenuOnce(
      "dy-live-collapsibleVipSeats",
      () => {
        if (!DouYinRouter.isLive()) {
          return;
        }
        return this.collapsibleVipSeats();
      },
      void 0,
      true
    );
  },
  /**
   * 贵宾席可收起
   *
   * 收起时只保留「折叠聊天按钮 + 在线观众数量」所在的一行，点击在线人数展开/收起。
   * 面板节点会随切换直播间、人数刷新被整体替换，因此常驻轮询补标记，而不是只处理一次。
   */
  collapsibleVipSeats() {
    /** 默认收起：启用该功能即代表要省空间 */
    let collapsed = true;
    /** 定位贵宾席面板：表头为在线人数所在行，面板容器为表头的父元素 */
    const getPanel = () => {
      const $audience = document.querySelector<HTMLElement>('#chatroom [data-e2e="live-room-audience"]');
      const $header = $audience?.parentElement;
      const $panel = $header?.parentElement;
      return $header && $panel ? { $header, $panel } : null;
    };
    /** 把标记同步到当前节点（节点被替换后需要重新打） */
    const sync = () => {
      const target = getPanel();
      if (target == null) {
        return;
      }
      const { $header, $panel } = target;
      // 值相同就不写，避免每轮轮询都产生一次属性变更
      if ($header.getAttribute(VIP_HEADER_ATTR) !== "1") {
        $header.setAttribute(VIP_HEADER_ATTR, "1");
      }
      if ($panel.getAttribute(VIP_PANEL_ATTR) !== "1") {
        $panel.setAttribute(VIP_PANEL_ATTR, "1");
      }
      const collapsedValue = collapsed ? "1" : "0";
      if ($panel.getAttribute(VIP_COLLAPSED_ATTR) !== collapsedValue) {
        $panel.setAttribute(VIP_COLLAPSED_ATTR, collapsedValue);
      }
    };
    sync();
    const timer = setInterval(() => {
      if (document.hidden || !DouYinRouter.isLive()) {
        return;
      }
      sync();
    }, 500);
    // 点击在线人数切换收起/展开；捕获阶段拦截，避免同时触发抖音自己的在线观众列表
    const listener = DOMUtils.on(
      document,
      "click",
      '#chatroom [data-e2e="live-room-audience"]',
      (event) => {
        DOMUtils.preventEvent(event);
        collapsed = !collapsed;
        sync();
      },
      { capture: true, overrideTarget: false }
    );
    return [
      addStyle(/*css*/ `
        [${VIP_PANEL_ATTR}][${VIP_COLLAPSED_ATTR}="1"] > :not([${VIP_HEADER_ATTR}]) {
          display: none !important;
        }
      `),
      () => {
        clearInterval(timer);
        listener.off();
        // 关闭功能时恢复面板显示
        const target = getPanel();
        if (target != null) {
          target.$header.removeAttribute(VIP_HEADER_ATTR);
          target.$panel.removeAttribute(VIP_PANEL_ATTR);
          target.$panel.removeAttribute(VIP_COLLAPSED_ATTR);
        }
      },
    ];
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

    /** 是否已卸载，避免轮询结束后又注入样式 */
    let disposed = false;
    let $bottomLayout: HTMLElement | null = null;
    let multiCameraStyle: HTMLStyleElement | undefined;

    // 多机位直播不能整体隐藏 #BottomLayout，需要给它打标记后只隐藏礼物栏。
    // 「多机位」文案出现的时机不确定（可能晚于页面加载），因此常驻轮询、每次比对当前节点
    const multiCameraTimer = setInterval(() => {
      if (disposed || document.hidden) {
        return;
      }
      const $el = document.querySelector<HTMLElement>("#BottomLayout");
      if ($el == null || !($el.textContent || "").includes("多机位")) {
        return;
      }
      if ($el.getAttribute("data-multi-camera") !== "true") {
        $el.setAttribute("data-multi-camera", "true");
        $bottomLayout = $el;
      }
      if (multiCameraStyle == null) {
        multiCameraStyle = addBlockCSS("#BottomLayout[data-multi-camera] .gitBarOptimizeEnabled");
      }
    }, 1000);

    result.push(() => {
      disposed = true;
      clearInterval(multiCameraTimer);
      $bottomLayout?.removeAttribute("data-multi-camera");
      $bottomLayout = null;
      removeStyle(multiCameraStyle);
      multiCameraStyle = undefined;
    });

    return result;
  },
};
