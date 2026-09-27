/**
 * 抖音地址处理
 *
 * 负责首页地址的改写与搜索链接的生成。
 */
import { log } from "@/core/log";
import { getValue } from "@/setting/value";

export const DouYinUrlHandler = {
  /**
   * 获取搜索链接
   * @param searchText 搜索关键词
   */
  getSearchUrl(searchText: string) {
    return "https://www.douyin.com/search/" + encodeURIComponent(searchText);
  },
  /**
   * 首页停留在推荐页
   *
   * 抖音把主站根路径 `/` 当作「抖音精选」入口，页面脚本加载后由客户端路由跳到 `/jingxuan`；
   * 只有带 `recommend=1&from_nav=1`（导航栏「推荐」的链接形式）的地址才会下发推荐流。
   * 因此在文档解析前改写地址并重新导航，避免被带到精选页。
   */
  redirectHomeToRecommend() {
    if (!getValue<boolean>("dy-common-recommend-home")) {
      return;
    }
    const url = new URL(globalThis.location.href);
    // 只处理抖音主站首页
    if ((url.hostname !== "www.douyin.com" && url.hostname !== "douyin.com") || url.pathname !== "/") {
      return;
    }
    // 已带推荐入口参数时不再改写，否则会与本功能互相触发形成循环
    if (url.searchParams.has("from_nav")) {
      return;
    }
    url.searchParams.set("recommend", "1");
    url.searchParams.set("from_nav", "1");
    log.success(`首页重定向到推荐页: ` + url.href);
    globalThis.location.replace(url.href);
  },
};
