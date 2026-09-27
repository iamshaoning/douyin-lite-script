/**
 * 功能自检
 *
 * 页面加载完成后，检查当前页面已注册的功能是否真正生效。
 *
 * 判断依据是「已托管的资源数量」（样式元素 + 卸载函数，见 `PanelMenuResultsHandler`）：
 * 键处于启用状态时，若没有任何可托管的资源，说明回调没有执行、提前返回或抛错，
 * 即该功能实际上没有生效——这正是本项目多数失效问题的表现。
 *
 * 发现未生效的功能时通知并重新执行回调，随后复核一次。
 */
import { DOMUtils } from "@/core/dom";
import { log } from "@/core/log";
import { toast } from "@/core/toast";
import { DouYinRouter } from "@/router/douyin-router";
import { Panel } from "@/setting/panel";
import { DouYinUser } from "@/main/user/douyin-user";
import { DouYinVideoPlayer } from "@/main/video/player/douyin-video-player";
import type { PanelViewConfig } from "@/setting/types";

/** 自检的开关键 */
const FEATURE_CHECK_KEY = "dy-common-feature-check";

/** 首次检查延迟（ms），等待页面把主要功能都跑起来 */
const FIRST_CHECK_DELAY = 3000;

/** 存在无法立即判定的项时的重判延迟（ms） */
const PENDING_RETRY_DELAY = 4000;

/** 无法立即判定的项最多重判轮次 */
const MAX_PENDING_ROUND = 3;

/** 重新生效后的复核延迟（ms） */
const RECHECK_DELAY = 2500;

/** 单个功能的检查结果，`pending` 表示当前还无法判定 */
type CheckResult = boolean | "pending";

/** 未生效的检查项 */
interface FailedItem {
  /** 键名 */
  key: string;
  /** 设置面板上显示的中文名 */
  text: string;
  /** 重新执行回调 */
  reload(): void;
}

/** 待执行的定时器 */
let timerList: ReturnType<typeof setTimeout>[] = [];

/** 无法立即判定的项已重判的轮次 */
let pendingRound = 0;

/** 清空定时器 */
function clearTimers() {
  timerList.forEach((timer) => clearTimeout(timer));
  timerList = [];
}

/** 延迟执行，并把定时器记录在案 */
function schedule(delay: number, callback: () => void) {
  const timer = setTimeout(() => {
    timerList = timerList.filter((item) => item !== timer);
    callback();
  }, delay);
  timerList.push(timer);
}

/** 递归查找键在设置面板上显示的中文名 */
function findViewText(views: PanelViewConfig[], key: string): string | undefined {
  for (const view of views) {
    if (view.type === "container" || view.type === "deepMenu") {
      const result = findViewText(view.views, key);
      if (result != null) {
        return result;
      }
    } else if (view.type !== "own" && view.key === key && view.text != null && view.text !== "") {
      return view.text;
    }
  }
  return undefined;
}

/** 获取键在设置面板上显示的中文名，找不到时回退为键名 */
function findMenuText(key: string): string {
  for (const config of Panel.$data.contentConfigList) {
    const text = findViewText(config.views, key);
    if (text != null) {
      return text;
    }
  }
  return key;
}

/**
 * 特例判断
 *
 * 默认判断是「有可托管的资源」；以下功能正常生效时也可能没有可托管的资源，需要单独判断。
 */
const CHECK_OVERRIDES: Record<string, (defaultResult: boolean) => CheckResult> = {
  // 画质选择为「自动」时回调本就不执行，没有托管资源属于正常
  "live-chooseQuality": (defaultResult) =>
    Panel.getValue<string>("live-chooseQuality") === "auto" ? true : defaultResult,
  // 该功能用 `execMenu` 注册，回调不返回可托管的内容，改用模块自身的执行状态判断；
  // 等待 React 属性最长需要 10s，此时尚未得出结论，挂起等下一轮再判
  "dy-user-addShowUserUID": () => {
    if (DouYinUser.$uidFailed) {
      return false;
    }
    if (DouYinUser.$uidApplied) {
      return true;
    }
    return "pending";
  },
  // 该功能用 `Panel.exec` 注册，回调只写 sessionStorage，没有可托管的资源，改用写入结果判断
  "dy-video-chooseVideoDefinition": () => {
    if (DouYinVideoPlayer.$qualityFailed) {
      return false;
    }
    if (DouYinVideoPlayer.$qualityApplied) {
      return true;
    }
    return "pending";
  },
};

/** 判断单个键是否生效 */
function checkKey(key: string, resourceCount: number): CheckResult {
  const defaultResult = resourceCount > 0;
  const override = CHECK_OVERRIDES[key];
  return override ? override(defaultResult) : defaultResult;
}

/** 功能所属的页面域 */
type PageDomain = "common" | "video" | "live" | "user";

/** 根据键名判断其所属的页面域 */
function getKeyDomain(key: string): PageDomain {
  if (key.startsWith("live-") || key.startsWith("dy-live-")) {
    return "live";
  }
  if (key.startsWith("dy-video-")) {
    return "video";
  }
  if (key.startsWith("dy-user-")) {
    return "user";
  }
  return "common";
}

/**
 * 当前页面适用的功能域
 *
 * 与各模块注册功能的时机保持一致：直播页是「通用 + 直播」，主站是「通用 + 视频」，用户页是「通用 + 用户」。
 * 站内跳转时，上一个页面注册的键仍会留在执行记录里（其回调被 url 变化重载后，因页面守卫直接返回，
 * 资源数变成 0），只检查当前页面适用的域可以避免把它们误判为未生效。
 */
function getCurrentDomainList(): PageDomain[] {
  const domainList: PageDomain[] = ["common"];
  if (DouYinRouter.isLive()) {
    domainList.push("live");
    return domainList;
  }
  if (DouYinRouter.isUser()) {
    domainList.push("user");
    return domainList;
  }
  // 抖音精选是瀑布流列表页，不会初始化播放器相关功能
  if (DouYinRouter.isIndex() && !DouYinRouter.isJingxuan()) {
    domainList.push("video");
  }
  return domainList;
}

/** 复核重新生效的结果 */
function verifyReloadResult(failedList: FailedItem[]) {
  const stateMap = new Map(Panel.getMenuExecStateList().map((state) => [state.keyList.join(","), state]));
  const fixedNameList: string[] = [];
  const stillFailedNameList: string[] = [];

  for (const item of failedList) {
    const state = stateMap.get(item.key);
    // 该项已被关闭或不再注册时不再判定
    if (state == null || !state.enable) {
      continue;
    }
    const result = checkKey(item.key, state.resourceCount);
    // 仍在等待结果（例如等待 React 属性）时无法判定
    if (result === "pending") {
      continue;
    }
    (result ? fixedNameList : stillFailedNameList).push(item.text);
  }

  if (fixedNameList.length > 0) {
    log.success("功能自检：已重新生效", fixedNameList);
    toast.success(`已重新生效：${fixedNameList.join("、")}`, 5000);
  }
  if (stillFailedNameList.length > 0) {
    log.error("功能自检：重新生效失败", stillFailedNameList);
    toast.error(`仍无法生效：${stillFailedNameList.join("、")}`, 8000);
  }
}

/** 执行一轮功能自检 */
function checkFeature(isManual: boolean) {
  let pendingCount = 0;
  const failedList: FailedItem[] = [];
  const domainList = getCurrentDomainList();

  for (const state of Panel.getMenuExecStateList()) {
    // 多键项是多键的与关系，无法对应到单个功能；未启用的项不参与自检
    if (state.keyList.length !== 1 || !state.enable) {
      continue;
    }
    const key = state.keyList[0];
    // 只检查当前页面适用的功能域
    if (!domainList.includes(getKeyDomain(key))) {
      continue;
    }
    const result = checkKey(key, state.resourceCount);
    if (result === "pending") {
      pendingCount++;
      continue;
    }
    if (!result) {
      failedList.push({ key, text: findMenuText(key), reload: state.reload });
    }
  }

  // 还有无法立即判定的项时，等一段时间整体重判；多轮仍无结论则视为通过，避免误报
  if (pendingCount > 0 && pendingRound < MAX_PENDING_ROUND) {
    pendingRound++;
    schedule(PENDING_RETRY_DELAY, () => checkFeature(isManual));
    return;
  }
  pendingRound = 0;

  if (failedList.length === 0) {
    if (isManual) {
      toast.success("功能自检通过，未发现未生效的功能");
    } else {
      log.success("功能自检通过");
    }
    return;
  }

  const nameList = failedList.map((item) => item.text);
  log.warn("功能自检发现未生效的功能", nameList);
  toast.warning(`检测到 ${failedList.length} 项功能未生效，正在尝试重新生效：${nameList.join("、")}`, 6000);
  failedList.forEach((item) => item.reload());
  schedule(RECHECK_DELAY, () => verifyReloadResult(failedList));
}

export const DouYinFeatureCheck = {
  /** 初始化：页面加载完成后自动检查一次 */
  init() {
    if (!Panel.getValue<boolean>(FEATURE_CHECK_KEY)) {
      return;
    }
    // 站内跳转时会重新调用，重置状态并重新计时，避免多次检查重叠
    clearTimers();
    pendingRound = 0;
    DOMUtils.onReady(() => {
      schedule(FIRST_CHECK_DELAY, () => checkFeature(false));
    });
  },
  /** 立即检查（设置面板上的手动入口，不受自动检查开关限制） */
  runNow() {
    clearTimers();
    pendingRound = 0;
    checkFeature(true);
  },
};
