/**
 * 直播聊天室的消息过滤执行入口
 *
 * 监听聊天室 DOM 变化触发一次过滤，并提供给 Hook 调用的逐条消息过滤方法。
 *
 * 与解码器劫持（`douyin-hook.ts`）并行常驻：劫持只能拦住经过 `decode` 的消息，
 * 解码器重建窗口期、绕开 `decode` 的消息需要在渲染后被移除，作为兜底。
 */
import { addStyle } from "@/core/dom";
import { mutationObserverBySelector } from "@/core/utils";
import { DouYinRouter } from "@/router/douyin-router";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";

export const DouYinLiveMessage = {
  /**
   * 监听聊天室 DOM 变化，对已渲染的消息做兜底过滤
   */
  filterMessage() {
    const runFilter = (mutations?: MutationRecord[]) => {
      if (!DouYinRouter.isLive()) return;
      DouYinLiveMessageFilter.change(mutations);
    };
    DouYinLiveMessageFilter.init();
    // 过滤只扫描聊天室内的弹幕，只观察 #chatroom，避免页面其它区域的变动触发扫描。
    //
    // 回调只处理本次新增/变化的行，必须同步执行、不能做节流/加锁：聊天列表是 React 虚拟列表，
    // 被 remove() 摘掉的行 React 会在后续渲染里把同一条消息重新插回（新节点不带 data-is-filter）。
    // 若加锁把回调推迟到下一轮，这些被重插的消息就会有可见的漏网窗口（实测同一房间可同时看到
    // 十余条未过滤消息）。MutationObserver 本身已按批回调，无需再自行限频。
    const observer = mutationObserverBySelector(["#chatroom"], {
      config: {
        childList: true,
        subtree: true,
      },
      callback: (mutations) => {
        runFilter(mutations);
      },
    });

    // 观察器绑定前已经渲染的消息需要一次全量扫描
    runFilter();

    /** 已卸载，避免空闲回调在关闭功能后继续扫描 */
    let disposed = false;
    /** 兜底扫描计数，用于定期强制复核 */
    let fallbackTick = 0;
    const runIdleFilter = () => {
      if (typeof globalThis.requestIdleCallback !== "function") {
        runFilter();
        return;
      }
      globalThis.requestIdleCallback(
        () => {
          if (!disposed) {
            runFilter();
          }
        },
        { timeout: 1000 }
      );
    };
    // 新增/重插的消息由 MutationObserver 同步处理，兜底只负责观察器失效、聊天室搬移等异常场景，
    // 因此从 500ms 降到 1.5s 并放进空闲回调；每 7 次（约 10.5s）清一次行级缓存、重建列表根节点，
    // 防止虚拟列表复用行或聊天室搬移后漏判
    const timer = setInterval(() => {
      if (document.hidden || disposed) {
        return;
      }
      fallbackTick++;
      if (fallbackTick % 7 === 0) {
        DouYinLiveMessageFilter.invalidateCheckCache(false);
        DouYinLiveMessageFilter.resetListRoot();
      }
      runIdleFilter();
    }, 1500);

    return [
      addStyle(/*css*/ `
				/* 修复一下聊天室屏蔽了某些聊天导致上下抖动不停 */
				#chatroom .webcast-chatroom___list > div {
					height: 100% !important;
				}
			`),
      () => {
        disposed = true;
        observer?.disconnect();
      },
      () => clearInterval(timer),
    ];
  },
  /**
   * 执行消息过滤
   * @returns {boolean}
   * + true 过滤
   * + false 不过滤
   */
  execFilter(messageInst: any, method: string) {
    if (!DouYinLiveMessageFilter.hasActiveRule()) {
      return false;
    }
    return DouYinLiveMessageFilter.checkMessageFilter(messageInst, method);
  },
};
