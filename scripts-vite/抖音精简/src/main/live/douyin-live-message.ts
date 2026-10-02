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
    const runFilter = () => {
      if (!DouYinRouter.isLive()) return;
      DouYinLiveMessageFilter.change();
    };
    DouYinLiveMessageFilter.init();
    // 过滤只扫描聊天室内的弹幕，只观察 #chatroom，避免页面其它区域的变动触发扫描。
    //
    // 这里必须同步执行，不能做节流/加锁：聊天列表是 React 虚拟列表，被 remove() 摘掉的行
    // React 会在后续渲染里把同一条消息重新插回（新节点不带 data-is-filter）。若加锁把回调
    // 推迟到下一轮，这些被重插的消息就会有明显可见的漏网窗口（实测同一房间可同时看到十余条
    // 未过滤消息）。MutationObserver 本身已按批回调，无需再自行限频。
    const observer = mutationObserverBySelector(["#chatroom"], {
      config: {
        childList: true,
        subtree: true,
      },
      immediate: true,
      callback: () => {
        runFilter();
      },
    });

    return [
      addStyle(/*css*/ `
				/* 修复一下聊天室屏蔽了某些聊天导致上下抖动不停 */
				#chatroom .webcast-chatroom___list > div {
					height: 100% !important;
				}
			`),
      () => observer?.disconnect(),
    ];
  },
  /**
   * 执行消息过滤
   * @returns {boolean}
   * + true 过滤
   * + false 不过滤
   */
  execFilter(messageInst: any, method: string) {
    return DouYinLiveMessageFilter.checkMessageFilter(messageInst, method);
  },
};
