import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import { USERSCRIPT_ICON } from "./vite.icon.mts";

/**
 * 脚本名称
 *
 * 同时作为 dist 输出文件名（`抖音精简.user.js`）
 */
const SCRIPT_NAME = "抖音精简";

/** 本地开发时使用的版本号，避免开发构建被脚本管理器当作正式更新 */
const DEV_VERSION = "9999.99.99";

/**
 * 构建时使用的版本号：`yyyy.MM.dd`
 */
function getBuildVersion() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}.${month}.${day}`;
}

export default defineConfig(({ command }) => {
  const isDev = command === "serve";
  const version = isDev ? DEV_VERSION : getBuildVersion();

  return {
    plugins: [
      monkey({
        entry: "./src/entrance.ts",
        // GM API 的虚拟模块名，需与 `types/vite-env.d.ts` 中的模块声明一致
        clientAlias: "ViteGM",
        userscript: {
          name: SCRIPT_NAME,
          namespace: "local.douyin-lite",
          version: version,
          description:
            "抖音页面精简与直播聊天室消息过滤：按消费等级/粉丝团/黑名单/自定义规则过滤发言，屏蔽送礼、福袋、信息播报；自定义直播清晰度、自动网页全屏；导航栏布局屏蔽；显示具体互动数量与UID",
          icon: USERSCRIPT_ICON,
          match: ["*://*.douyin.com/*"],
          exclude: ["*://creator.douyin.com/*"],
          license: "MIT",
          "run-at": "document-start",
        },
        build: {
          fileName: `${SCRIPT_NAME}.user.js`,
          metaFileName: () => `${SCRIPT_NAME}.meta.js`,
          autoGrant: true,
        },
        server: {
          mountGmApi: true,
          open: false,
        },
      }),
    ],
  };
});
