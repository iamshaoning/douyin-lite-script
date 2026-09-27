import { DouYin } from "@/main/douyin";
import { DouYinIFrameHook } from "@/main/hook/douyin-iframe-hook";
import { DouYinUrlHandler } from "@/router/douyin-url-handler";
import { Panel } from "@/setting/panel";
import { PanelGeneralConfig } from "@/setting/view/general";
import { PanelLiveConfig } from "@/setting/view/live";
import { PanelUserConfig } from "@/setting/view/user";
import { PanelVideoConfig } from "@/setting/view/video";

// 抖音的自定义协议 iframe 会被系统接管并弹出「获取打开此链接的应用」对话框，这里尽早拦截
DouYinIFrameHook.hookCustomProtocol();

// 抖音会把首页重定向到「抖音精选」，这里在文档解析前改写地址，使其停留在推荐页
DouYinUrlHandler.redirectHomeToRecommend();

Panel.addContentConfig([PanelGeneralConfig, PanelVideoConfig, PanelLiveConfig, PanelUserConfig]);

Panel.init();

DouYin.init();
