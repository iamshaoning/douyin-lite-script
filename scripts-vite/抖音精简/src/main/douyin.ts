/**
 * 抖音功能总入口
 *
 * 负责全局屏蔽样式、路由判断与各页面模块的分发。
 */
import { cookieManager } from "@/core/cookie";
import { addStyle, DOMUtils } from "@/core/dom";
import { log } from "@/core/log";
import { toast } from "@/core/toast";
import { DouYinRouter } from "@/router/douyin-router";
import { DouYinUrlHandler } from "@/router/douyin-url-handler";
import { Panel } from "@/setting/panel";
import { DouYinBlock } from "@/main/block-frame/douyin-block";
import { DouYinChannel } from "@/main/channel/douyin-channel";
import blockCSS from "@/main/css/block.css?raw";
import { DouYinGestureBackClearHash } from "@/main/douyin-gesture-back-config";
import { DouYinFeatureCheck } from "@/main/douyin-feature-check";
import { DouYinRouterChangeData } from "@/main/douyin-router-change-data";
import { DouYinLive } from "@/main/live/douyin-live";
import { DouYinNote } from "@/main/note/douyin-note";
import { DouYinUser } from "@/main/user/douyin-user";
import { DouYinVideo } from "@/main/video/douyin-video";
import { DouYinVideoCommentUserMenu } from "@/main/video/douyin-video-comment-user-menu";
import { DouYinPlayerContextMenu } from "@/main/video/douyin-player-context-menu";
import { DouYinVideoPlayer } from "@/main/video/player/douyin-video-player";

export const DouYin = {
  init() {
    if (!(DouYinRouter.isIndex() || DouYinRouter.isLive())) {
      // 当前仅主站和直播页面支持
      log.error(`当前仅主站和直播页面支持${globalThis.self === globalThis.top ? "" : "（iframe）"}`);
      return;
    }
    Panel.execMenuOnce(
      "dy-remove-ads",
      () => {
        return this.removeAds();
      },
      void 0,
      true
    );
    DouYinGestureBackClearHash();
    DouYinBlock.init();
    // 播放区域右键菜单追加「屏蔽 TA」，视频屏蔽作者、直播屏蔽主播
    DouYinPlayerContextMenu.init();

    Panel.execMenuOnce(
      "dy-common-listenRouterChange",
      () => {
        return this.listenRouterChange();
      },
      void 0,
      false
    );

    Panel.execMenuOnce("dy-search-click-to-new-tab", () => {
      return this.navSearchClickToNewTab();
    });

    if (DouYinRouter.isLive()) {
      DouYinLive.init();
    } else if (DouYinRouter.isIndex()) {
      // 视频评论区的用户名点击，改为弹出「进主页 / 屏蔽 TA」小菜单
      DouYinVideoCommentUserMenu.init();
      // 抖音精选是瀑布流列表页，没有播放器容器，无需初始化播放器增强模块
      if (!DouYinRouter.isJingxuan()) {
        DouYinVideoPlayer.init();
      }

      if (DouYinRouter.isUser()) {
        DouYinUser.init();
      } else if (DouYinRouter.isVideo()) {
        DouYinVideo.init();
      } else if (DouYinRouter.isChannel()) {
        DouYinChannel.init();
      } else if (DouYinRouter.isNote()) {
        DouYinNote.init();
      } else {
        log.warn("子router: " + window.location.href);
      }
    }
    // 页面功能已分发完成，检查它们是否真正生效
    DouYinFeatureCheck.init();
  },
  /**
   * 移除ads
   */
  removeAds() {
    // 左侧导航栏的下面的抖音精选
    cookieManager.update(
      {
        name: "JXEntranceNegative",
        value: "1",
      },
      () => {}
    );
    DOMUtils.waitNode<HTMLElement>(
      () =>
        DOMUtils.selector<HTMLElement>(
          '#douyin-navigation [data-e2e="douyin-navigation"] > div > div > div:regexp("下载抖音精选|条条都是宝藏视频")'
        ),
      10000
    ).then(($el) => {
      if (!$el) {
        return;
      }
      DOMUtils.remove($el);
    });
    return [addStyle(blockCSS)];
  },
  /**
   * 监听Router重载
   */
  listenRouterChange() {
    let url = window.location.href;
    const callback = () => {
      const beforeUrl = url;
      const currentUrl = window.location.href;
      url = currentUrl;
      DouYinRouterChangeData.beforeURL = beforeUrl;
      DouYinRouterChangeData.currentURL = currentUrl;
      log.success(`Router Change Before: ` + beforeUrl);
      log.success(`Router Change Now: ` + currentUrl);
      Panel.emitUrlChangeWithExecMenuOnceEvent({
        url: currentUrl,
        beforeUrl: beforeUrl,
      });
      this.init();
    };
    const listener = DOMUtils.on(window, "wb_url_change", callback);
    return [listener.off];
  },
  /**
   * 新标签页打开搜索结果
   */
  navSearchClickToNewTab() {
    // 搜索框按钮点击
    // 超链接点击
    const listener_1 = DOMUtils.on(
      document,
      "click",
      [
        '[data-click="doubleClick"]:has(input[data-e2e="searchbar-input"]) button[data-e2e="searchbar-button"]',
        'a[href*="douyin.com/search/"]',
      ],
      (evt, $click) => {
        if (!$click) {
          return;
        }
        DOMUtils.preventEvent(evt);
        let url: string | undefined;
        if ($click instanceof HTMLAnchorElement) {
          // 视频区域的点击信息
          url = $click.href;
        } else {
          // 顶部搜索框的搜索按钮
          const $doubleClick = $click.closest<HTMLElement>('[data-click="doubleClick"]');
          if (!$doubleClick) {
            toast.error("未找到搜索框元素");
            return;
          }
          const $input = $doubleClick.querySelector<HTMLInputElement>("input");
          if (!$input) {
            toast.error("未找到搜索框输入框");
            return;
          }
          let searchText = $input.value;
          if (searchText == null || searchText === "") {
            // 这时候获取不到搜索内容
            // 搜索内容元素在input前面
            const $before = DOMUtils.prev($input);
            if ($before) {
              searchText = DOMUtils.text($before);
            } else {
              const placeholder = $input.placeholder.trim();
              if (placeholder != null && placeholder !== "" && placeholder !== "搜索你感兴趣的内容") {
                searchText = placeholder;
              } else {
                log.error("搜索内容为空，不进行搜索");
                return;
              }
            }
          }
          url = DouYinUrlHandler.getSearchUrl(searchText);
        }
        window.open(url, "_blank");
        return false;
      },
      {
        capture: true,
        overrideTarget: false,
      }
    );
    // 搜索建议
    const listener_2 = DOMUtils.on(
      document,
      "click",
      '[data-e2e="searchbar-button"] + div [data-text][data-index]',
      (evt, $selector) => {
        if (!$selector) {
          return;
        }
        const $click = evt.composedPath()[0] as HTMLElement;
        const $icon = $click.closest(".icon[data-text]");
        if ($icon && $selector.contains($icon)) {
          // 忽略点击填入输入框的图标
          return;
        }
        const $closeSVG = $click.closest<HTMLElement>("svg");
        if ($closeSVG && $selector.contains($closeSVG)) {
          // 忽略点击关闭图标
          // 但是好像依旧不生效
          return;
        }
        DOMUtils.preventEvent(evt);
        const searchText = $selector.getAttribute("data-text");
        if (!searchText) {
          log.error("未找到搜索建议内容", $selector);
          toast.error("未找到搜索建议内容");
          return;
        }
        const url = DouYinUrlHandler.getSearchUrl(searchText);
        window.open(url, "_blank");
        return false;
      },
      { capture: true, isComposedPath: true, overrideTarget: false }
    );
    return [listener_1.off, listener_2.off];
  },
};
