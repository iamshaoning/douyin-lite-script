/**
 * 用户页样式注入与 UID 展示
 *
 * 注入用户页屏蔽样式，并可按设置项在用户资料卡上追加可点击复制的 UID。
 */
import { DOMUtils, addStyle, remove } from "@/core/dom";
import { log } from "@/core/log";
import { ReactUtils } from "@/core/react";
import { toast } from "@/core/toast";
import { utils } from "@/core/utils";
import { Panel } from "@/setting/panel";
import blockCSS from "@/main/css/block.css?raw";

export const DouYinUser = {
  /** 是否已注入用户页屏蔽样式，避免每次路由变化重复 addStyle 抬高引用计数 */
  $inited: false,
  /** 「显示UID」是否已成功写入页面 */
  $uidApplied: false,
  /** 「显示UID」是否已确认失败（资料卡存在但取不到 uid） */
  $uidFailed: false,
  init() {
    if (!this.$inited) {
      this.$inited = true;
      addStyle(blockCSS);
    }
    DOMUtils.onReady(() => {
      // `once` 缓存会阻止回调重跑，站内跳转到用户页后必须靠 url 变化重载才能再次生效
      Panel.execMenuOnce(
        "dy-user-addShowUserUID",
        () => {
          return this.addShowUserUID();
        },
        void 0,
        true
      );
    });
  },
  /**
   * 显示UID
   */
  addShowUserUID() {
    const nodeClassName = "gm-user-uid";
    // 每次执行都先重置：否则上一个用户页的成功标记会残留，功能自检会误判为已生效
    DouYinUser.$uidApplied = false;
    DouYinUser.$uidFailed = false;
    ReactUtils.waitReactPropsToSet(`[data-e2e="user-detail"] [data-e2e="user-info"]`, "reactFiber", {
      msg: "显示UID",
      check(reactInstance) {
        return typeof reactInstance?.return?.memoizedProps?.userInfo?.uid === "string";
      },
      set(reactInstance, $target) {
        const uid: string = reactInstance?.return?.memoizedProps?.userInfo?.uid;
        DouYinUser.$uidApplied = true;
        DouYinUser.$uidFailed = false;
        $target.querySelectorAll<HTMLElement>(`.${nodeClassName}`).forEach(($node) => {
          remove($node);
        });
        const $userUID = DOMUtils.createElement(
          "p",
          {
            className: nodeClassName,
            innerHTML: /*html*/ `
							<span>UID：${uid}</span>
						`,
          },
          {
            style: "color: var(--color-text-t3);margin-right: 20px;font-size: 12px;line-height: 20px;cursor: pointer;",
          }
        );
        DOMUtils.on($userUID, "click", (event) => {
          DOMUtils.preventEvent(event);
          utils.copy(uid);
          toast.success("复制成功");
        });
        $target.appendChild($userUID);
      },
      failWait(isTimeout) {
        // `isTimeout` 为真说明资料卡元素一直没出现（可能当前页面本来就没有），此时无法判定，不做失败标记
        if (isTimeout) {
          return;
        }
        DouYinUser.$uidFailed = true;
        log.error("显示UID：未能从用户资料卡取到 uid");
      },
    });
    // 关闭开关或切到其它页面时移除已注入的 UID
    return [
      () => {
        document.querySelectorAll<HTMLElement>(`.${nodeClassName}`).forEach(($node) => {
          remove($node);
        });
      },
    ];
  },
};
