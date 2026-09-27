/**
 * 直播聊天室划词屏蔽
 *
 * 在直播聊天室中手动划词后，选区上方弹出「屏蔽该词」按钮，
 * 点击后把该词按字面量加入「聊天室消息过滤器」的屏蔽规则中。
 */
import { addStyle, DOMUtils } from "@/core/dom";
import { toast } from "@/core/toast";
import { BLOCK_ICON } from "@/main/live/douyin-live-block-icon";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";

const BUTTON_ID = "dy-live-block-word";

const BLOCK_WORD_CSS = /*css*/ `
#${BUTTON_ID}{
  position: fixed !important;
  z-index: 2147483647 !important;
  display: none !important;
  align-items: center !important;
  gap: 4px !important;
  box-sizing: border-box !important;
  height: 28px !important;
  padding: 0 10px !important;
  margin: 0 !important;
  border: 1px solid rgba(255, 255, 255, 0.14) !important;
  border-radius: 6px !important;
  background: rgba(28, 28, 34, 0.92) !important;
  color: #fe2c55 !important;
  font-size: 13px !important;
  line-height: 1 !important;
  white-space: nowrap !important;
  cursor: pointer !important;
  opacity: 1 !important;
  -webkit-user-select: none !important;
  user-select: none !important;
}
#${BUTTON_ID}[data-show="true"]{
  display: flex !important;
}
#${BUTTON_ID}:hover{
  background: rgba(54, 54, 64, 0.96) !important;
  border-color: rgba(254, 44, 85, 0.55) !important;
  color: #ff4d6d !important;
  opacity: 1 !important;
}
#${BUTTON_ID} svg{
  display: block !important;
  width: 14px !important;
  height: 14px !important;
  opacity: 1 !important;
}
`;

/**
 * 划词屏蔽：在直播聊天室中手动划词后，选区上方弹出「屏蔽该词」按钮
 *
 * 点击后把该词按字面量加入「聊天室消息过滤器」的屏蔽规则中
 */
export const DouYinLiveBlockWord = {
  $button: <HTMLElement | null>null,
  /** 按钮当前对应的选中文本 */
  selectedText: "",
  /** 是否正在点击按钮自身（此时不要收起按钮） */
  $clickingButton: false,
  $inited: false,
  init() {
    if (this.$inited) {
      return;
    }
    this.$inited = true;
    addStyle(BLOCK_WORD_CSS);
    document.addEventListener(
      "mousedown",
      (event) => {
        if (this.isButtonTarget(event.target)) {
          this.$clickingButton = true;
          return;
        }
        this.hideButton();
      },
      true
    );
    document.addEventListener(
      "mouseup",
      (event) => {
        if (this.$clickingButton) {
          this.$clickingButton = false;
          return;
        }
        if (this.isButtonTarget(event.target)) {
          return;
        }
        // 等一拍，确保选区已更新
        setTimeout(() => {
          this.updateButtonBySelection();
        }, 0);
      },
      true
    );
    // 滚动后选区位置失效，直接收起
    window.addEventListener(
      "scroll",
      () => {
        this.hideButton();
      },
      true
    );
  },
  /**
   * 事件目标是否在按钮内
   */
  isButtonTarget($target: EventTarget | null) {
    if (!($target instanceof Node) || !this.$button) {
      return false;
    }
    return $target === this.$button || this.$button.contains($target);
  },
  /**
   * 根据当前选区决定按钮的显隐与位置
   */
  updateButtonBySelection() {
    const selection = window.getSelection();
    const text = selection ? String(selection).trim() : "";
    if (!text || !selection || selection.rangeCount === 0) {
      this.hideButton();
      return;
    }
    const range = selection.getRangeAt(0);
    // 只在直播聊天室内生效
    const $container = range.commonAncestorContainer;
    const $element = $container.nodeType === Node.ELEMENT_NODE ? ($container as HTMLElement) : $container.parentElement;
    if (!$element?.closest("#chatroom .webcast-chatroom")) {
      this.hideButton();
      return;
    }
    const rect = range.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      this.hideButton();
      return;
    }
    this.selectedText = text;
    const $button = this.getButton();
    $button.setAttribute("data-show", "true");
    const btnRect = $button.getBoundingClientRect();
    let left = rect.left + rect.width / 2 - btnRect.width / 2;
    left = Math.min(Math.max(8, left), window.innerWidth - btnRect.width - 8);
    // 优先放在选区上方：抖音点击消息后弹出的菜单出现在选区下方，放上方可避免重叠
    let top = rect.top - btnRect.height - 8;
    if (top < 8) {
      // 上方空间不足则放到选区下方
      top = rect.bottom + 8;
    }
    $button.style.setProperty("left", `${left}px`, "important");
    $button.style.setProperty("top", `${top}px`, "important");
  },
  /**
   * 点击「屏蔽该词」
   */
  blockSelectedWord() {
    const text = this.selectedText;
    this.hideButton();
    if (!text) {
      return;
    }
    // 划词内容不可控，转义正则元字符，按字面量屏蔽
    const ruleText = text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    if (DouYinLiveMessageFilter.addRule(ruleText)) {
      toast.success(`已添加屏蔽规则：${text}`, 4000);
    } else {
      toast.success(`${text} 已在屏蔽规则中`, 4000);
    }
  },
  /**
   * 获取（懒创建）按钮
   */
  getButton() {
    if (this.$button?.isConnected) {
      return this.$button;
    }
    const $button = DOMUtils.createElement("button", {
      id: BUTTON_ID,
      type: "button",
      title: "将该词加入「聊天室消息过滤器」的屏蔽规则",
      innerHTML: `${BLOCK_ICON}<span>屏蔽该词</span>`,
    });
    DOMUtils.on($button, "mousedown", (event) => {
      // 阻止默认行为，避免点击按钮时选区被清空
      event.preventDefault();
      event.stopPropagation();
    });
    DOMUtils.on($button, "click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      this.blockSelectedWord();
    });
    document.body.appendChild($button);
    this.$button = $button;
    return $button;
  },
  /**
   * 收起按钮
   */
  hideButton() {
    this.selectedText = "";
    this.$button?.setAttribute("data-show", "false");
  },
};
