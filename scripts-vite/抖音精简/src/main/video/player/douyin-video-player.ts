/**
 * 视频播放器增强
 *
 * 提供暂停弹窗自动关闭、视频文案可选中、评论区时间跳转、
 * 点赞/评论/收藏/分享完整数量显示以及指定清晰度等能力。
 */
import { $, $$, DOMUtils, addStyle, isScriptNode } from "@/core/dom";
import { unsafeWindow } from "@/core/gm";
import { log } from "@/core/log";
import { toast } from "@/core/toast";
import { utils } from "@/core/utils";
import { DouYinRouter } from "@/router/douyin-router";
import { Panel } from "@/setting/panel";
import { getDynamicValue } from "@/setting/value";
import type { DouYinVideoAwemeInfoWithDOM } from "@/types/douyin-video-type";

/**
 * 把秒数格式化为 `时钟:分:秒`
 */
function parseDuration(duration: number) {
  const zeroPadding = function (num: number) {
    if (num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };
  if (duration < 60) {
    return `0:${zeroPadding(duration)}`;
  } else if (duration < 3600) {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${zeroPadding(seconds)}`;
  } else {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor(duration / 60) % 60;
    const seconds = duration % 60;
    return `${hours}:${zeroPadding(minutes)}:${zeroPadding(seconds)}`;
  }
}

export const DouYinVideoPlayer = {
  /** 「指定清晰度」是否已成功写入 sessionStorage */
  $qualityApplied: false,
  /** 「指定清晰度」是否已确认失败（配置的清晰度不在支持列表中，或写入未成功） */
  $qualityFailed: false,
  init() {
    DOMUtils.onReady(() => {
      // 清晰度只写入 sessionStorage，没有可托管的资源，因此用 `Panel.exec` 自定义执行判断注册，
      // 功能自检才能发现它；不能用 `execMenuOnce`，其默认判断会把「智能」（值为 0）当成关闭，回调根本不执行
      Panel.exec(
        "dy-video-chooseVideoDefinition",
        () => {
          return this.chooseQuality(Panel.getValue("dy-video-chooseVideoDefinition"));
        },
        () =>
          DouYinRouter.isIndex() &&
          !DouYinRouter.isJingxuan() &&
          Panel.getValue<number>("dy-video-chooseVideoDefinition") !== -999,
        true
      ).then((result) => {
        // 换视频后需要重新写入清晰度，而 `once` 缓存会阻止回调重跑，因此监听 url 变化重载
        if (result) {
          Panel.addUrlChangeWithExecMenuOnceListener("dy-video-chooseVideoDefinition", () => {
            result.reload();
          });
        }
      });
      // 暂停弹窗检测、评论区时间跳转、完整数量显示都依赖 `mutationObserverBySelector` 观察播放器、
      // 评论区等节点，这些节点在站内跳转时会被整体替换，观察随之失效，因此监听 url 变化重载；
      // 当前不在主站播放器相关页面时直接跳过，避免在直播等页面做无意义的观察
      Panel.execMenuOnce(
        "dy-video-waitToRemovePauseDialog",
        () => {
          if (!DouYinRouter.isIndex() || DouYinRouter.isJingxuan()) {
            return;
          }
          return this.waitToRemovePauseDialog();
        },
        void 0,
        true
      );
      // 该功能基于 document 事件委托 + 全局样式，节点被替换后依然有效，无需监听 url 变化
      Panel.execMenuOnce("dy-video-allowSelectTitleText", () => {
        return this.allowSelectTitleText();
      });
      Panel.execMenuOnce(
        "dy-video-commentTimeJump",
        () => {
          if (!DouYinRouter.isIndex() || DouYinRouter.isJingxuan()) {
            return;
          }
          return this.commentTimeJump();
        },
        void 0,
        true
      );
      Panel.execMenuOnce(
        "dy-video-showLikeCommentCollectShareCount",
        () => {
          if (!DouYinRouter.isIndex() || DouYinRouter.isJingxuan()) {
            return;
          }
          return this.showCompleteLikeCommentCollectShareCount();
        },
        void 0,
        true
      );
    });
  },
  /**
   * 信息区域
   *
   * 长时间无操作，已暂停播放
   */
  waitToRemovePauseDialog() {
    /** 已提示过的节点 */
    const notifiedSet = new WeakSet<HTMLElement>();
    /**
     * 检测并关闭弹窗
     * @param $ele
     */
    const checkDialogToClose = ($ele: HTMLElement) => {
      // 脚本自己注入的节点（提示框、设置面板等）的文本也会包含关键词，必须跳过，否则会自我触发形成死循环
      if (isScriptNode($ele)) {
        return;
      }
      const eleText = DOMUtils.text($ele);
      if (eleText.includes("长时间无操作") && eleText.includes("暂停播放")) {
        // 弹窗未消失时 DOM 每次变动都会重复命中同一节点，避免提示刷屏
        if (notifiedSet.has($ele)) {
          return;
        }
        notifiedSet.add($ele);
        toast.info(`出现【长时间无操作，已暂停播放】弹窗`);
        const $rect = utils.getReactInstance($ele);
        if (typeof $rect.reactProps === "object" && $rect.reactProps != null) {
          const closeDialogFn = utils.queryProperty($rect.reactProps, (obj) => {
            if (typeof obj?.["props"]?.["onClose"] === "function") {
              return {
                isFind: true,
                data: obj["props"]["onClose"],
              };
            } else {
              // 未找到，进入下一层
              const children = obj?.["props"]?.["children"] ?? obj?.["children"];
              return {
                isFind: false,
                data: Array.isArray(children) ? children[0] : children,
              };
            }
          });
          if (typeof closeDialogFn === "function") {
            closeDialogFn();
            toast.success(`调用函数关闭【长时间无操作，已暂停播放】弹窗`);
          }
        }
      }
    };
    const waitToRemovePauseDialog = getDynamicValue("dy-video-waitToRemovePauseDialog");
    // 弹窗只会出现在播放器容器内，只观察该容器，避免页面任一变动都触发扫描
    const lockFn = new utils.LockFunction(() => {
      if (!waitToRemovePauseDialog.value) {
        return;
      }
      [
        ...Array.from($$<HTMLDivElement>(`.basePlayerContainer xg-bar.xg-right-bar + div`)),
        ...Array.from($$<HTMLElement>(`.basePlayerContainer div:has(>div):contains("长时间无操作")`)),
      ].forEach(($elementTiming) => {
        checkDialogToClose($elementTiming);
      });
    }, 400);
    const observer = utils.mutationObserverBySelector([".basePlayerContainer"], {
      config: {
        subtree: true,
        childList: true,
      },
      immediate: true,
      callback: () => {
        lockFn.run();
      },
    });
    return [
      () => {
        observer?.disconnect();
      },
      waitToRemovePauseDialog.destroy,
    ];
  },
  /**
   * 解除视频文案复制限制
   */
  allowSelectTitleText() {
    const listener = DOMUtils.on(
      document,
      ["pointerdown", "pointerup"],
      '.video-info-detail[data-e2e="video-info"] .title[data-e2e="video-desc"]',
      (evt) => {
        DOMUtils.preventEvent(evt, true);
      },
      { capture: true, overrideTarget: false }
    );

    return [
      addStyle(/*css*/ `
      .video-info-detail[data-e2e="video-info"] .title[data-e2e="video-desc"]{
        user-select: all !important;
        pointer-events: auto !important;
      }
      `),
      () => {
        listener.off();
      },
    ];
  },
  /**
   * 评论区时间可跳转
   */
  commentTimeJump() {
    const transformTime = (time: string) => {
      const timeArr = time.split(":");
      if (timeArr.length !== 2 && timeArr.length !== 3) {
        return;
      }
      const second = parseInt(timeArr[timeArr.length - 1]);
      const minute = parseInt(timeArr[timeArr.length - 2]);
      const hour = timeArr.length === 3 ? parseInt(timeArr[0]) : 0;
      const timeStamp = hour * 60 * 60 + minute * 60 + second;
      return timeStamp;
    };

    // HH:MM:SS 与 MM:SS 合并成一条正则、只做一次替换：若分两次替换，HH:MM:SS 替换出的
    // `12:34:56` 会被 MM:SS 再匹配一次，产生嵌套 span，点击时取到的是内层错误时间。
    // 带 g 的正则带 lastIndex 状态，复用会互相干扰，因此检测与替换各用一份
    const timeRegExpSource = "\\d{1,2}:[0-5][0-9]:[0-5][0-9]|[0-5]?[0-9]:[0-5][0-9]";
    const timeRegExpSearch = new RegExp(timeRegExpSource);
    const timeRegExpGlobal = new RegExp(timeRegExpSource, "g");
    // 处理单个评论元素
    const processCommentElement = ($comment: Element) => {
      // 检查是否已经处理过
      if ($comment.hasAttribute("data-dy-time-processed")) {
        return;
      }

      // 标记为已处理，避免重复处理
      $comment.setAttribute("data-dy-time-processed", "true");

      // 递归查找所有包含时间的文本节点
      const walker = document.createTreeWalker($comment, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          const text = node.textContent || "";
          return timeRegExpSearch.test(text) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        },
      });

      const textNodes: Text[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node as Text);
      }

      textNodes.forEach((textNode) => {
        const originalText = textNode.textContent || "";

        let hasTimeMatch = false;
        const processedText = originalText.replace(timeRegExpGlobal, (match) => {
          const timestamp = transformTime(match);
          if (typeof timestamp === "number" && !isNaN(timestamp)) {
            hasTimeMatch = true;
            return `<span class="dy-comment-time" data-time="${timestamp}">${match}</span>`;
          }
          return match;
        });

        // 只有当文本实际发生变化时才替换
        if (hasTimeMatch && processedText !== originalText) {
          const wrapper = DOMUtils.createElement("span", {
            innerHTML: processedText,
          });

          const parent = textNode.parentNode;
          if (parent) {
            parent.replaceChild(wrapper, textNode);
          }
        }
      });
    };
    // 点击时间戳处理
    const handleTimeClick = (event: Event, $click?: HTMLElement) => {
      if (!$click) {
        return;
      }
      DOMUtils.preventEvent(event);
      const timeStr = $click.getAttribute("data-time") || "0";
      const jumpTimeDuration = parseInt(timeStr);
      if (!isNaN(jumpTimeDuration) && jumpTimeDuration >= 0) {
        let $video: HTMLVideoElement | null = null;
        if (DouYinRouter.isVideo()) {
          // 单个video下
          const $videoContainer = $click.closest('[data-e2e="video-detail"]');
          if (!$videoContainer) {
            toast.error("未找到视频容器");
            return;
          }
          $video = $videoContainer.querySelector<HTMLVideoElement>('[data-e2e="player-container"] video');
        } else {
          const $videoContainer = $click.closest(".sliderVideo") || $click.closest('[data-e2e="feed-active-video"]');
          if (!$videoContainer) {
            toast.error("未找到视频容器");
            return;
          }
          $video = $videoContainer.querySelector<HTMLVideoElement>("video");
        }
        if (!$video) {
          toast.error("未找到视频元素");
          return;
        }
        const jumpTimeDurationStr = parseDuration(jumpTimeDuration);
        if (jumpTimeDuration > $video.duration) {
          toast.error(`该跳转时间超出视频最大播放时长: ${timeStr} => ${jumpTimeDurationStr}`);
          return;
        }
        $video.currentTime = jumpTimeDuration;
      }
    };
    // 添加点击事件监听
    const listener = DOMUtils.on(document, "click", ".dy-comment-time", handleTimeClick, {
      capture: true,
      overrideTarget: false,
    });
    // 只观察评论区，评论区滚动时变动频繁，加锁限频避免高频全量扫描
    const lockFn = new utils.LockFunction(() => {
      if (DouYinRouter.isLive()) return;
      const $commentItems = $$('[data-e2e="comment-item"]:not([data-dy-time-processed])');
      $commentItems.forEach(($commentItem) => {
        processCommentElement($commentItem);
      });
    }, 400);
    const observer = utils.mutationObserverBySelector(['[data-e2e="comment-list"]'], {
      config: {
        subtree: true,
        childList: true,
      },
      immediate: true,
      callback: () => {
        lockFn.run();
      },
    });
    return [
      addStyle(/*css*/ `
        .dy-comment-time{
          cursor: pointer;
          color: #48a4ff;
          text-decoration: none;
        }
      `),
      () => {
        listener.off();
        observer?.disconnect();
        $$('[data-e2e="comment-item"][data-dy-time-processed]').forEach(($commentItem) => {
          $commentItem.removeAttribute("data-dy-time-processed");
        });
        $$('[data-e2e="comment-item"] .dy-comment-time').forEach(($time) => {
          DOMUtils.html($time, DOMUtils.text($time));
        });
      },
    ];
  },
  /**
   * 显示点赞、评论、收藏、分享的具体数量
   */
  showCompleteLikeCommentCollectShareCount() {
    // 只观察承载视频卡片的容器，避免页面任一变动都触发回调
    const lockFn = new utils.LockFunction(() => {
      [...$$(".basePlayerContainer:not([data-show-full-count])")].forEach(($basePlayerContainer) => {
        const basePlayerContainerReactFiber = utils.getReactInstance($basePlayerContainer)?.reactFiber;
        if (!basePlayerContainerReactFiber) {
          log.error("获取rectFiber属性失败", { $basePlayerContainer, basePlayerContainerReactFiber });
          return;
        }
        const awemeInfo = utils.queryProperty<DouYinVideoAwemeInfoWithDOM>(basePlayerContainerReactFiber, (target) => {
          if (typeof target.memoizedProps === "object" && target.memoizedProps != null) {
            if (typeof target.memoizedProps.awemeInfo === "object" && target.memoizedProps.awemeInfo != null) {
              return {
                isFind: true,
                data: target.memoizedProps.awemeInfo,
              };
            } else {
              if (typeof target.return === "object" && target.return != null) {
                return {
                  isFind: false,
                  data: target.return,
                };
              } else {
                return {
                  isFind: false,
                  data: null,
                };
              }
            }
          } else {
            return {
              isFind: false,
              data: null,
            };
          }
        });
        if (!awemeInfo) {
          log.error("获取awemeInfo属性失败", { $basePlayerContainer, basePlayerContainerReactFiber });
          return;
        }
        const stats = (awemeInfo as Partial<DouYinVideoAwemeInfoWithDOM>).stats;
        if (!stats) {
          log.error("获取stats属性失败", { $basePlayerContainer, awemeInfo });
          return;
        }

        // 在单个视频页面，点赞、评论、收藏、分享按钮不在右侧，在视频下面
        let $digg: HTMLElement | undefined | null,
          $comment: HTMLElement | undefined | null,
          $collect: HTMLElement | undefined | null,
          $share: HTMLElement | undefined | null;
        if (DouYinRouter.isVideo()) {
          // 所以这里单独处理
          $digg = $(
            '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(1) > span:not(:has(>*))'
          );
          $comment = $(
            '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(2) > span:not(:has(>*))'
          );
          $collect = $(
            '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(3) > span:not(:has(>*))'
          );
          $share = $(
            '[data-e2e="detail-video-info"] div:has(>[data-e2e="video-share-icon-container"]) > div:nth-child(4) > span:not(:has(>*))'
          );
        } else {
          $digg = $basePlayerContainer.querySelector<HTMLElement>(
            '[data-e2e="video-player-digg"] > div:last-child:not(:has(>*))'
          );
          $comment = $basePlayerContainer.querySelector<HTMLElement>(
            '[data-e2e="feed-comment-icon"] > div:last-child:not(:has(>*))'
          );
          $collect = $basePlayerContainer.querySelector<HTMLElement>(
            '[data-e2e="video-player-collect"] > div:last-child:not(:has(>*))'
          );
          $share = $basePlayerContainer.querySelector<HTMLElement>(
            '[data-e2e="video-player-share"] > div:last-child:not(:has(>*))'
          );
        }

        // 至少写入一项后才打标记：四项都没找到说明选择器可能已失效（如页面改版），
        // 不打标记则后续 DOM 变动时仍会重试，而不是永久沉默
        let hasApplied = false;
        if ($digg) {
          DOMUtils.text($digg, stats.diggCount);
          hasApplied = true;
        }
        if ($comment) {
          DOMUtils.text($comment, stats.commentCount);
          hasApplied = true;
        }
        if ($collect) {
          DOMUtils.text($collect, stats.collectCount);
          hasApplied = true;
        }
        if ($share) {
          DOMUtils.text($share, stats.shareCount);
          hasApplied = true;
        }
        if (!hasApplied) {
          log.error("未找到点赞/评论/收藏/分享数量元素", { $basePlayerContainer });
          return;
        }
        $basePlayerContainer.setAttribute("data-show-full-count", "true");
      });
    }, 400);
    const observer = utils.mutationObserverBySelector(["#slidelist", '[data-e2e="video-detail"]'], {
      config: {
        subtree: true,
        childList: true,
      },
      immediate: true,
      callback: () => {
        lockFn.run();
      },
    });

    return () => {
      observer?.disconnect();
      // 清掉标记，重新开启功能时才会重新处理（关闭功能不还原已显示的数字）
      $$(".basePlayerContainer[data-show-full-count]").forEach(($basePlayerContainer) => {
        $basePlayerContainer.removeAttribute("data-show-full-count");
      });
    };
  },
  /**
   * 指定视频清晰度
   *
   * 抖音的清晰度读取自 sessionStorage，所以这里需要定时写入
   *
   * @param mode 清晰度
   */
  chooseQuality(mode = 0) {
    log.info("选择视频清晰度: " + mode);
    const QualitySessionKey = "MANUAL_SWITCH";
    const definition: {
      done: number;
      gearClarity: string;
      gearName: string;
      gearType: number;
      qualityType?: number;
    }[] = [
      { done: 1, gearClarity: "20", gearName: "超清 4K", gearType: -2, qualityType: 72 },
      { done: 1, gearClarity: "10", gearName: "超清 2K", gearType: -1, qualityType: 7 },
      { done: 1, gearClarity: "5", gearName: "高清 1080P", gearType: 1, qualityType: 2 },
      { done: 1, gearClarity: "4", gearName: "高清 720P", gearType: 2, qualityType: 15 },
      { done: 1, gearClarity: "3", gearName: "标清 540P", gearType: 3, qualityType: 21 },
      { done: 1, gearClarity: "2", gearName: "极速", gearType: 4, qualityType: 21 },
      { done: 1, gearClarity: "0", gearName: "智能", gearType: 0 },
      { done: -999, gearClarity: "-999", gearName: "无", gearType: -999 },
    ];
    const choose = definition.find((item) => item.gearType === mode);
    /** 抖音清晰度读取是来自session的 */
    const setVideoQuality = function (value: string | object) {
      unsafeWindow.sessionStorage.setItem(QualitySessionKey, typeof value === "string" ? value : JSON.stringify(value));
    };
    if (!choose) {
      DouYinVideoPlayer.$qualityApplied = false;
      DouYinVideoPlayer.$qualityFailed = true;
      log.error("该清晰度不存在: " + mode);
      return;
    }
    if (choose.gearName === "无") {
      // 选择「无」表示不使用该功能，不算失败
      DouYinVideoPlayer.$qualityApplied = false;
      DouYinVideoPlayer.$qualityFailed = false;
      return;
    }
    // 先写入一次并读回校验，确认这一步真的成功；功能自检也依赖这个结果
    setVideoQuality(choose);
    DouYinVideoPlayer.$qualityApplied =
      unsafeWindow.sessionStorage.getItem(QualitySessionKey) === JSON.stringify(choose);
    DouYinVideoPlayer.$qualityFailed = !DouYinVideoPlayer.$qualityApplied;
    if (!DouYinVideoPlayer.$qualityApplied) {
      log.error("设置当前视频的清晰度失败: " + choose.gearName);
      return;
    }
    log.success("设置当前视频的清晰度: " + choose.gearName);
    const intervalId = setInterval(() => {
      setVideoQuality(choose);
    }, 200);
    const stopTimerId = setTimeout(() => {
      clearInterval(intervalId);
    }, 5 * 1000);
    // 返回卸载函数，关闭开关或换页时立即停掉定时写入
    return [
      () => {
        clearInterval(intervalId);
        clearTimeout(stopTimerId);
      },
    ];
  },
};
