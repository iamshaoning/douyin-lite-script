/**
 * 抖音官方「拉黑用户」能力
 *
 * 抖音网页版没有对外暴露拉黑接口，但它的 webpack 模块里就有现成的拉黑函数。
 * 这里通过 `webpackChunk*` 拿到 webpack 的 `require`，再按接口路径从全部模块中
 * 定位出拉黑函数直接调用，从而免去「跳转个人主页 → 再点拉黑」的繁琐流程，
 * 也能自动享受抖音自己的安全 SDK 初始化与公共参数。
 *
 * 定位是惰性的：只在用户真正点「屏蔽 TA」时才扫描 webpack 模块，
 * 避免在 document-start 的启动路径上引入同步长任务。
 */
import { unsafeWindow } from "@/core/gm";
import { log } from "@/core/log";

/** 拉黑接口路径，用于在 webpack 模块中定位官方拉黑函数 */
const BLOCK_API_PATH = "/aweme/v1/web/user/block/";

/** 拉黑类型：1 拉黑，0 取消拉黑 */
const BLOCK_TYPE_BLOCK = 1;

/** 抖音官方拉黑函数（`source` 为埋点参数，可省略） */
type BlockUserFunction = (userId: string, secUserId: string, blockType: number, source?: string) => Promise<any>;

/** webpack 的 require 函数 */
type WebpackRequire = ((id: string) => any) & { m?: Record<string, any> };

/** 拉黑结果 */
export interface BlockUserResult {
  /** 是否拉黑成功 */
  success: boolean;
  /** 结果说明（失败时给出原因） */
  message: string;
}

/**
 * 取 window 上的 webpack chunk 数组
 *
 * 抖音的 chunk 名形如 `webpackChunkdouyin_web`，不同站点可能不同，因此不做硬编码
 */
function getWebpackChunk(): any[] | null {
  const win = unsafeWindow as any;
  const keyList = Object.keys(win);
  for (let index = 0; index < keyList.length; index++) {
    const key = keyList[index];
    if (key.indexOf("webpackChunk") !== 0) {
      continue;
    }
    const chunk = win[key];
    if (Array.isArray(chunk) && typeof chunk.push === "function") {
      return chunk;
    }
  }
  return null;
}

/**
 * 捕获 webpack 的 require
 *
 * 往 chunk 数组里 push 一个空模块，webpack 的 jsonp 回调会把 `require` 当运行时参数传进来
 */
function captureWebpackRequire(): WebpackRequire | null {
  const chunk = getWebpackChunk();
  if (!chunk) {
    return null;
  }
  let req: any = null;
  try {
    chunk.push([
      ["dy-lite-user-block-" + Date.now()],
      {},
      (runtimeRequire: any) => {
        req = runtimeRequire;
      },
    ]);
  } catch (error) {
    return null;
  }
  return typeof req === "function" ? req : null;
}

export const DouYinUserBlock = {
  /** 缓存下来的 webpack require */
  $req: null as WebpackRequire | null,
  /** 已定位到的官方拉黑函数 */
  $blockFunction: null as BlockUserFunction | null,
  /** 取 webpack require（只在首次捕获，之后复用） */
  getRequire() {
    if (this.$req?.m) {
      return this.$req;
    }
    this.$req = captureWebpackRequire();
    return this.$req;
  },
  /**
   * 定位抖音官方的拉黑函数
   *
   * 不依赖易变的模块 id 与导出名：先按接口路径找出模块，
   * 再在它的导出里找函数体同样包含该路径的那一个。
   *
   * 全量扫描成本不低，因此只在用户真正发起拉黑时才调用，不做启动预热。
   *
   * @returns 是否已定位到
   */
  locate(): boolean {
    if (typeof this.$blockFunction === "function") {
      return true;
    }
    const req = this.getRequire();
    const modules = req?.m;
    if (!req || !modules) {
      return false;
    }
    const moduleIdList = Object.keys(modules);
    for (let index = 0; index < moduleIdList.length; index++) {
      const moduleId = moduleIdList[index];
      let moduleSource = "";
      try {
        moduleSource = String(modules[moduleId]);
      } catch (error) {
        continue;
      }
      if (moduleSource.indexOf(BLOCK_API_PATH) === -1) {
        continue;
      }
      let moduleExports: any = null;
      try {
        moduleExports = req(moduleId);
      } catch (error) {
        continue;
      }
      if (moduleExports == null || typeof moduleExports !== "object") {
        continue;
      }
      const exportKeyList = Object.keys(moduleExports);
      for (let exportIndex = 0; exportIndex < exportKeyList.length; exportIndex++) {
        const exportValue = moduleExports[exportKeyList[exportIndex]];
        if (typeof exportValue !== "function") {
          continue;
        }
        if (String(exportValue).indexOf(BLOCK_API_PATH) === -1) {
          continue;
        }
        this.$blockFunction = exportValue as BlockUserFunction;
        log.info("[拉黑] 已定位到抖音拉黑接口，模块 id：" + moduleId);
        return true;
      }
    }
    return false;
  },
  /**
   * 拉黑用户
   *
   * `source` 是埋点参数，抖音自己的调用点在懒加载分包里取不到，这里省略
   */
  async blockUser(params: { userId?: string; secUserId?: string }): Promise<BlockUserResult> {
    const userId = String(params.userId || "");
    const secUserId = String(params.secUserId || "");
    if (!userId && !secUserId) {
      return { success: false, message: "没取到该用户的 id" };
    }
    if (!this.locate()) {
      return { success: false, message: "没找到抖音的拉黑接口，请再点一次重试" };
    }
    try {
      const response = await this.$blockFunction!(userId, secUserId, BLOCK_TYPE_BLOCK);
      if (response && Number(response.status_code) === 0) {
        return { success: true, message: "已拉黑" };
      }
      return {
        success: false,
        message: String((response && response.status_msg) || "拉黑失败，请稍后重试"),
      };
    } catch (error) {
      log.error("[拉黑] 拉黑请求失败：", error);
      return { success: false, message: "拉黑请求失败，请稍后重试" };
    }
  },
};
