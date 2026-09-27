/**
 * 直播页面「聊天室消息过滤器」的浮动快捷入口
 *
 * 可拖动，位置会持久化，点击（非拖动）打开过滤器设置分组。
 */
import { SCRIPT_NAME } from "@/core/gm";
import { addStyle, DOMUtils, SCRIPT_NODE_ATTR } from "@/core/dom";
import { Panel } from "@/setting/panel";
import type { PanelContentConfig } from "@/setting/types";
import { PanelLiveMessageFilterViews } from "@/setting/view/live-message-filter";
import { DouYinRouter } from "@/router/douyin-router";

const ENTRY_ID = "dy-live-message-filter-entry";
/** 按钮位置持久化 */
const POSITION_STORAGE_KEY = "dy-live-message-filter-entry-position";
/** 判定为拖动而非点击的位移阈值（px） */
const DRAG_THRESHOLD = 4;
/** 按钮尺寸（px） */
const ENTRY_SIZE = 40;

const ENTRY_CSS = /*css*/ `
#${ENTRY_ID}{
  position: fixed !important;
  z-index: 2147483646 !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  box-sizing: border-box !important;
  width: ${ENTRY_SIZE}px !important;
  height: ${ENTRY_SIZE}px !important;
  padding: 0 !important;
  margin: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 50% !important;
  background: rgba(28, 28, 34, 0.92) !important;
  color: #fe2c55 !important;
  cursor: grab !important;
  opacity: 1 !important;
  touch-action: none !important;
  -webkit-user-select: none !important;
  user-select: none !important;
  transition: background 0.2s, border-color 0.2s !important;
}
#${ENTRY_ID}:hover{
  background: rgba(54, 54, 64, 0.96) !important;
  border-color: rgba(254, 44, 85, 0.55) !important;
  color: #ff4d6d !important;
  opacity: 1 !important;
}
#${ENTRY_ID}[data-dragging="true"]{
  cursor: grabbing !important;
}
#${ENTRY_ID}[data-enable="false"]{
  color: rgba(255, 255, 255, 0.3) !important;
}
#${ENTRY_ID} svg{
  display: block !important;
  width: 20px !important;
  height: 20px !important;
  opacity: 1 !important;
  pointer-events: none !important;
}
`;

/** 漏斗图标（消息过滤） */
const FILTER_ICON = /*html*/ `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16" fill="none"><path d="M2.5 3.2h11a.6.6 0 0 1 .47.97l-4.07 5.1v3.9a.6.6 0 0 1-.9.53l-2-1.1a.6.6 0 0 1-.3-.53V9.27L2.03 4.17A.6.6 0 0 1 2.5 3.2Z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/></svg>`;

/**
 * 直播页面「聊天室消息过滤器」的浮动快捷入口
 *
 * 可拖动，位置会持久化，点击（非拖动）打开过滤器设置分组
 */
export const DouYinLiveMessageFilterEntry = {
  $entry: <HTMLElement | null>null,
  /** 本次 mousedown～mouseup 是否发生过拖动（拖动后不触发点击） */
  $dragged: false,
  $inited: false,
  init() {
    if (this.$inited) {
      return;
    }
    this.$inited = true;
    addStyle(ENTRY_CSS);
    Panel.addValueChangeListener(
      "live-danmu-shield-rule-enable",
      (_, value) => {
        this.updateEnableState(value);
      },
      {
        immediate: true,
      }
    );
    // 页面自身或路由变化时元素可能被移除，定时补齐
    // 标签页不可见时无法产生交互，跳过轮询避免后台空跑
    setInterval(() => {
      if (document.hidden) {
        return;
      }
      this.syncEntry();
    }, 1000);
    window.addEventListener("resize", () => {
      if (!this.$entry) {
        return;
      }
      this.setPosition(this.getPosition().left, this.getPosition().top);
    });
  },
  /**
   * 打开「聊天室消息过滤器」设置分组
   */
  openFilterPanel() {
    const configList: PanelContentConfig[] = [
      {
        id: "dy-live-danmu-filter-menu",
        title: "聊天室消息过滤器",
        views: PanelLiveMessageFilterViews,
      },
    ];
    Panel.showPanel(configList, `${SCRIPT_NAME}-聊天室消息过滤器`);
  },
  /**
   * 同步按钮的挂载状态（仅在直播页面显示）
   */
  syncEntry() {
    if (!DouYinRouter.isLive()) {
      this.removeEntry();
      return;
    }
    if (!this.$entry) {
      const $entry = DOMUtils.createElement(
        "div",
        {
          id: ENTRY_ID,
          title: "聊天室消息过滤器（可拖动）",
          innerHTML: FILTER_ICON,
        },
        { [SCRIPT_NODE_ATTR]: "" }
      );
      this.$entry = $entry;
      this.bindEvent($entry);
      document.body.appendChild($entry);
      this.applyPosition();
      this.updateEnableState(Panel.getValue("live-danmu-shield-rule-enable"));
    } else if (!this.$entry.isConnected) {
      document.body.appendChild(this.$entry);
    }
  },
  removeEntry() {
    this.$entry?.remove();
    this.$entry = null;
  },
  /**
   * 绑定拖动与点击
   */
  bindEvent($entry: HTMLElement) {
    let startLeft = 0;
    let startTop = 0;
    let startX = 0;
    let startY = 0;
    let isDragging = false;
    const onMouseMove = (event: MouseEvent) => {
      if (!isDragging) {
        return;
      }
      DOMUtils.preventEvent(event);
      this.setPosition(startLeft + (event.clientX - startX), startTop + (event.clientY - startY));
    };
    const onMouseUp = (event: MouseEvent) => {
      if (!isDragging) {
        return;
      }
      isDragging = false;
      $entry.removeAttribute("data-dragging");
      document.removeEventListener("mousemove", onMouseMove, true);
      document.removeEventListener("mouseup", onMouseUp, true);
      this.$dragged =
        Math.abs(event.clientX - startX) > DRAG_THRESHOLD || Math.abs(event.clientY - startY) > DRAG_THRESHOLD;
      if (this.$dragged) {
        this.savePosition();
      }
    };
    DOMUtils.on($entry, "mousedown", (event) => {
      const mouseEvent = event as MouseEvent;
      if (mouseEvent.button !== 0) {
        return;
      }
      DOMUtils.preventEvent(mouseEvent);
      const rect = $entry.getBoundingClientRect();
      startX = mouseEvent.clientX;
      startY = mouseEvent.clientY;
      startLeft = rect.left;
      startTop = rect.top;
      isDragging = true;
      $entry.setAttribute("data-dragging", "true");
      document.addEventListener("mousemove", onMouseMove, true);
      document.addEventListener("mouseup", onMouseUp, true);
    });
    DOMUtils.on($entry, "click", (event) => {
      DOMUtils.preventEvent(event);
      if (this.$dragged) {
        // 本次是拖动结束，不打开面板
        this.$dragged = false;
        return;
      }
      this.openFilterPanel();
    });
  },
  /**
   * 设置位置（自动限制在可视区域内）
   */
  setPosition(left: number, top: number) {
    if (!this.$entry) {
      return;
    }
    const maxLeft = Math.max(0, window.innerWidth - ENTRY_SIZE);
    const maxTop = Math.max(0, window.innerHeight - ENTRY_SIZE);
    const safeLeft = Math.min(Math.max(0, left), maxLeft);
    const safeTop = Math.min(Math.max(0, top), maxTop);
    this.$entry.style.setProperty("left", `${safeLeft}px`, "important");
    this.$entry.style.setProperty("top", `${safeTop}px`, "important");
  },
  /**
   * 获取当前位置
   */
  getPosition() {
    return {
      left: Number.parseFloat(this.$entry?.style.left || "0") || 0,
      top: Number.parseFloat(this.$entry?.style.top || "0") || 0,
    };
  },
  /**
   * 恢复位置，无记录时放在聊天区右侧偏下的位置
   */
  applyPosition() {
    const position = this.readPosition();
    if (position) {
      this.setPosition(position.left, position.top);
      return;
    }
    this.setPosition(window.innerWidth - ENTRY_SIZE - 24, window.innerHeight - 260);
  },
  savePosition() {
    const position = this.getPosition();
    window.localStorage.setItem(POSITION_STORAGE_KEY, JSON.stringify(position));
  },
  readPosition(): { left: number; top: number } | null {
    const value = window.localStorage.getItem(POSITION_STORAGE_KEY);
    if (!value) {
      return null;
    }
    let position: { left: number; top: number };
    try {
      position = JSON.parse(value);
    } catch {
      // 存储内容被外部改坏时忽略，回退到默认位置
      return null;
    }
    if (typeof position?.left !== "number" || typeof position?.top !== "number") {
      return null;
    }
    return position;
  },
  /**
   * 更新启用状态
   */
  updateEnableState(enable: any) {
    if (!this.$entry) {
      return;
    }
    this.$entry.setAttribute("data-enable", enable ? "true" : "false");
  },
};
