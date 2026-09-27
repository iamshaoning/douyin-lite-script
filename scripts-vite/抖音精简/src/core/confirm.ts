/**
 * 二次确认弹窗
 *
 * 拉黑属于不可轻率触发的操作，屏蔽入口在真正执行前都先弹这个确认框。
 * 项目里没有可复用的弹窗组件，这里做一个轻量的 Promise 版：点「确定」得到 `true`，
 * 点「取消」、点遮罩或按 Esc 得到 `false`。
 *
 * 配色沿用 toast 的深色底，主按钮用抖音红 `#fe2c55`；
 * 弹窗自身不依赖页面的 semi 主题变量，浅色/深色模式下外观一致。
 */
import { addStyle, SCRIPT_NODE_ATTR } from "@/core/dom";

/** 遮罩容器 id */
const OVERLAY_ID = "dy-lite-confirm";

/** 抖音红 */
const DOUYIN_RED = "#fe2c55";

const CONFIRM_CSS = /* css */ `
#${OVERLAY_ID} {
  position: fixed;
  inset: 0;
  z-index: 2147483647;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  animation: dy-lite-confirm-in 0.15s ease-out;
}
#${OVERLAY_ID} .dy-lite-confirm-panel {
  box-sizing: border-box;
  width: 320px;
  max-width: calc(100vw - 32px);
  padding: 16px;
  border-radius: 8px;
  background: #1f1f26;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.32);
  color: #f2f2f4;
  font-size: 13px;
  line-height: 1.5;
  user-select: none;
}
#${OVERLAY_ID} .dy-lite-confirm-title {
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
}
#${OVERLAY_ID} .dy-lite-confirm-message {
  color: rgba(255, 255, 255, 0.72);
  word-break: break-all;
}
#${OVERLAY_ID} .dy-lite-confirm-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 20px;
}
#${OVERLAY_ID} .dy-lite-confirm-footer > button {
  box-sizing: border-box;
  min-width: 72px;
  padding: 7px 16px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.2;
  cursor: pointer;
}
#${OVERLAY_ID} .dy-lite-confirm-cancel {
  background: rgba(255, 255, 255, 0.14);
  color: rgba(255, 255, 255, 0.85);
}
#${OVERLAY_ID} .dy-lite-confirm-cancel:hover {
  background: rgba(255, 255, 255, 0.22);
}
#${OVERLAY_ID} .dy-lite-confirm-ok {
  background: ${DOUYIN_RED};
  color: #fff;
}
#${OVERLAY_ID} .dy-lite-confirm-ok:hover {
  background: #e62a50;
}
@keyframes dy-lite-confirm-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
`;

/** 弹窗可配置项 */
interface ConfirmOption {
  /** 标题，默认「提示」 */
  title?: string;
  /** 确定按钮文案，默认「确定」 */
  confirmText?: string;
  /** 取消按钮文案，默认「取消」 */
  cancelText?: string;
}

/** 当前弹窗的关闭方法，保证同一时刻只存在一个弹窗 */
let closeCurrent: ((result: boolean) => void) | null = null;

/** Esc 的关闭监听是否已绑定 */
let keydownBound = false;

/**
 * Esc 关闭当前弹窗
 *
 * 常驻绑定一次即可：弹窗即使被外部移除也不会留下没人清理的监听，
 * 也就不会出现旧监听抢走 Esc、导致后面打开的弹窗关不掉的情况
 */
function onDocumentKeyDown(event: KeyboardEvent) {
  if (event.key !== "Escape" || !closeCurrent) {
    return;
  }
  // Esc 只用来关弹窗，别再透传给页面（全屏播放时抖音会拿它退出全屏）
  event.preventDefault();
  event.stopPropagation();
  closeCurrent(false);
}

/**
 * 弹出二次确认
 *
 * @param message 提示正文
 * @param option 标题与按钮文案
 * @returns 点「确定」为 `true`，其余关闭方式为 `false`
 */
export function confirm(message: string, option: ConfirmOption = {}): Promise<boolean> {
  addStyle(CONFIRM_CSS);
  if (!keydownBound) {
    keydownBound = true;
    document.addEventListener("keydown", onDocumentKeyDown, true);
  }
  // 上一个弹窗还开着就按「取消」处理，避免两个弹窗叠在一起
  closeCurrent?.(false);
  return new Promise<boolean>((resolve) => {
    const $overlay = document.createElement("div");
    $overlay.id = OVERLAY_ID;
    $overlay.setAttribute(SCRIPT_NODE_ATTR, "1");

    const $panel = document.createElement("div");
    $panel.className = "dy-lite-confirm-panel";

    const $title = document.createElement("div");
    $title.className = "dy-lite-confirm-title";
    $title.textContent = option.title ?? "提示";

    const $message = document.createElement("div");
    $message.className = "dy-lite-confirm-message";
    $message.textContent = message;

    const $cancel = document.createElement("button");
    $cancel.type = "button";
    $cancel.className = "dy-lite-confirm-cancel";
    $cancel.textContent = option.cancelText ?? "取消";

    const $ok = document.createElement("button");
    $ok.type = "button";
    $ok.className = "dy-lite-confirm-ok";
    $ok.textContent = option.confirmText ?? "确定";

    const $footer = document.createElement("div");
    $footer.className = "dy-lite-confirm-footer";
    $footer.appendChild($cancel);
    $footer.appendChild($ok);

    $panel.appendChild($title);
    $panel.appendChild($message);
    $panel.appendChild($footer);
    $overlay.appendChild($panel);

    const finish = (result: boolean) => {
      // 已被新弹窗顶掉时不再处理，避免误关掉新弹窗
      if (closeCurrent !== finish) {
        return;
      }
      closeCurrent = null;
      $overlay.remove();
      resolve(result);
    };

    // 弹窗内的交互不要再传给页面，避免播放器把点击当成暂停/播放
    $overlay.addEventListener(
      "click",
      (event) => {
        event.stopPropagation();
        if (event.target === $ok) {
          finish(true);
        } else if (event.target === $cancel || event.target === $overlay) {
          finish(false);
        }
      },
      true
    );
    $overlay.addEventListener("mousedown", (event) => event.stopPropagation(), true);

    // 全屏播放时 body 下的节点不参与渲染，要挂到全屏元素里，否则弹窗根本看不见
    (document.fullscreenElement ?? document.body ?? document.documentElement).appendChild($overlay);
    closeCurrent = finish;
    $ok.focus();
  });
}
