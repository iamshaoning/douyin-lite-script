import { execFileSync } from "node:child_process";
import { defineConfig } from "vite";
import monkey from "vite-plugin-monkey";
import { USERSCRIPT_ICON } from "./vite.icon.mts";

/**
 * 脚本名称
 *
 * 同时作为 dist 输出文件名（`抖音精简.user.js`）
 */
const SCRIPT_NAME = "抖音精简";

/**
 * 发布仓库信息，用于生成 userscript 的下载与更新地址
 *
 * 构建产物会同步到该仓库，用户可直接从 raw 链接安装并自动检测更新
 */
const REPO_OWNER = "iamshaoning";
const REPO_NAME = "douyin-lite-script";
const REPO_BRANCH = "main";

/** 构建产物在仓库中的目录（相对仓库根目录） */
const DIST_DIR_IN_REPO = `scripts-vite/${SCRIPT_NAME}/dist`;

/** 构建产物在仓库中的 raw 地址前缀 */
const REPO_RAW_BASE = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${REPO_BRANCH}/${DIST_DIR_IN_REPO}`;

/** 本地开发时使用的版本号，避免开发构建被脚本管理器当作正式更新 */
const DEV_VERSION = "9999.99.99";

/**
 * 读取上一次已提交（≈已推送）的构建产物中的版本号
 *
 * 以 git HEAD 中的产物为基准：同一份改动重复构建会得到相同版本号（幂等），
 * 只有在提交之后的下一次构建才会递增，契合「每次推送 +1」
 */
function getLastCommittedVersion(): string | null {
  try {
    const content = execFileSync("git", ["show", `HEAD:${DIST_DIR_IN_REPO}/${SCRIPT_NAME}.user.js`], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    });
    return content.match(/@version\s+(\S+)/)?.[1] ?? null;
  } catch {
    return null;
  }
}

/** 数字补零为两位 */
function pad2(value: number) {
  return String(value).padStart(2, "0");
}

/**
 * 构建时使用的版本号：`yyyy.MM.dd.xx`
 *
 * `xx` 为当日递增序号：同一天在上一次已提交版本基础上 `+1`，跨天重置为 `01`
 */
function getBuildVersion() {
  const now = new Date();
  const date = `${now.getFullYear()}.${pad2(now.getMonth() + 1)}.${pad2(now.getDate())}`;

  const parts = getLastCommittedVersion()?.split(".") ?? [];
  // 兼容旧格式 `yyyy.MM.dd`（3 段，无序号）
  const sameDay = parts.slice(0, 3).join(".") === date;
  const lastSeq = parts.length >= 4 ? Number.parseInt(parts[3], 10) : 0;
  const seq = sameDay && Number.isFinite(lastSeq) ? lastSeq + 1 : 1;

  return `${date}.${pad2(seq)}`;
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
          license: "GPL-3.0-only",
          "run-at": "document-start",
          // 供从仓库 raw 链接安装的用户脚本自动检测更新，指向仅含元数据的 `.meta.js`
          updateURL: `${REPO_RAW_BASE}/${SCRIPT_NAME}.meta.js`,
          downloadURL: `${REPO_RAW_BASE}/${SCRIPT_NAME}.user.js`,
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
