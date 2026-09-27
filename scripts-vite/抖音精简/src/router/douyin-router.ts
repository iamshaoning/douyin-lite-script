/**
 * 抖音路由判断
 *
 * 使用原生 `URL` 解析地址，等价于原脚本 `RouterUtil.builder(href)` 的实现。
 */

/**
 * 解析地址
 * @param href 需要解析的地址，未传入时使用当前页面地址
 */
function parseURL(href?: string): URL {
  return new URL(href ?? globalThis.location.href, globalThis.location.href);
}

/** 获取 pathname */
function getPathname(href?: string): string {
  return parseURL(href).pathname;
}

export const DouYinRouter = {
  /**
   * 是否是抖音主站
   */
  isIndex(href?: string) {
    const hostname = parseURL(href).hostname;
    return hostname === "www.douyin.com" || hostname === "douyin.com";
  },
  /**
   * 直播
   */
  isLive(href?: string) {
    return parseURL(href).hostname === "live.douyin.com" || this.isFollowLive(href) || this.isRootLive(href);
  },
  /**
   * 关注-直播
   *
   * + /follow/live/
   */
  isFollowLive(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/follow/live/");
  },
  /**
   * 刷视频时的点击进去的直播
   *
   * + /root/live/
   */
  isRootLive(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/root/live/");
  },
  /**
   * 搜索
   *
   * + /search/
   * + /root/search/
   * + /user/用户id/search/搜索内容
   */
  isSearch(href?: string) {
    return (
      this.isIndex(href) &&
      (this.isRootSearch(href) || getPathname(href).startsWith("/search/") || this.isUserSearch(href))
    );
  },
  /**
   * 其它地方进去的搜索
   *
   * + /root/search/
   */
  isRootSearch(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/root/search/");
  },
  /**
   * 例如：知识、二次元、游戏、美食等
   *
   * + /channel/
   */
  isChannel(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/channel/");
  },
  /**
   * 用户主页
   *
   * + /user/
   */
  isUser(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/user/");
  },
  /**
   * 用户主页顶部进去的搜索
   *
   * + /user/用户id/search/搜索内容
   */
  isUserSearch(href?: string) {
    return this.isUser(href) && getPathname(href).includes("/search/");
  },
  /**
   * 单个视频，一般是分享的视频链接
   *
   * + /video/
   */
  isVideo(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/video/");
  },
  /**
   * 抖音精选（已被抖音用作主站默认首页）
   *
   * + /jingxuan
   */
  isJingxuan(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/jingxuan");
  },
  /**
   * 笔记图文
   *
   * + /note/
   */
  isNote(href?: string) {
    return this.isIndex(href) && getPathname(href).startsWith("/note/");
  },
};
