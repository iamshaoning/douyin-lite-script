/**
 * 直播聊天室的消息过滤执行入口
 *
 * 监听聊天室 DOM 变化触发一次过滤，并提供给 Hook 调用的逐条消息过滤方法。
 *
 * 与解码器劫持（`douyin-hook.ts`）并行常驻：劫持只能拦住经过 `decode` 的消息，
 * 解码器重建窗口期、绕开 `decode` 的消息需要在渲染后被移除，作为兜底。
 */
import { addStyle } from "@/core/dom";
import { LockFunction, mutationObserverBySelector } from "@/core/utils";
import { DouYinRouter } from "@/router/douyin-router";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";

export const DouYinLiveMessage = {
  /**
   * 监听聊天室 DOM 变化，对已渲染的消息做兜底过滤
   */
  filterMessage() {
    // 弹幕越密变动越频繁，加锁限频避免高频全量扫描
    const lockFn = new LockFunction(() => {
      if (!DouYinRouter.isLive()) return;
      DouYinLiveMessageFilter.change();
    }, 250);
    DouYinLiveMessageFilter.init();
    // 过滤只扫描聊天室内的弹幕，只观察 #chatroom，避免页面其它区域的变动触发扫描
    const observer = mutationObserverBySelector(["#chatroom"], {
      config: {
        childList: true,
        subtree: true,
      },
      immediate: true,
      callback: () => {
        lockFn.run();
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
