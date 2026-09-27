/**
 * 轻量提示（Toast）
 *
 * 抖音配色的消息提示，替代第三方 Qmsg。
 */
import { addStyle, SCRIPT_NODE_ATTR } from "@/core/dom";

type ToastType = "info" | "success" | "warning" | "error";

const CONTAINER_ID = "dy-lite-toast-container";

const TYPE_COLOR_MAP: Record<ToastType, string> = {
  info: "#2b6cb0",
  success: "#0eac0e",
  warning: "#d69e2e",
  error: "#e53e3e",
};

const TOAST_CSS = /* css */ `
#${CONTAINER_ID} {
  position: fixed;
  top: 88px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2147483647;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  pointer-events: none;
}
#${CONTAINER_ID} .dy-lite-toast {
  box-sizing: border-box;
  display: flex;
  align-items: center;
  max-width: 80vw;
  padding: 10px 12px 10px 0;
  border-radius: 4px;
  background: #1f1f26;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.28);
  color: #f2f2f4;
  font-size: 13px;
  font-weight: 400;
  line-height: 1.4;
  word-break: break-all;
  animation: dy-lite-toast-in 0.18s ease-out;
}
#${CONTAINER_ID} .dy-lite-toast::before {
  content: "";
  flex: none;
  width: 4px;
  align-self: stretch;
  margin-right: 8px;
  border-radius: 4px 0 0 4px;
}
#${CONTAINER_ID} .dy-lite-toast[data-type="info"]::before {
  background: ${TYPE_COLOR_MAP.info};
}
#${CONTAINER_ID} .dy-lite-toast[data-type="success"]::before {
  background: ${TYPE_COLOR_MAP.success};
}
#${CONTAINER_ID} .dy-lite-toast[data-type="warning"]::before {
  background: ${TYPE_COLOR_MAP.warning};
}
#${CONTAINER_ID} .dy-lite-toast[data-type="error"]::before {
  background: ${TYPE_COLOR_MAP.error};
}
@keyframes dy-lite-toast-in {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
#${CONTAINER_ID} .dy-lite-toast--leave {
  animation: dy-lite-toast-out 0.2s ease-in forwards;
}
@keyframes dy-lite-toast-out {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
  }
}
`;

let isStyleAdded = false;

/** 获取提示容器 */
function getContainer(): HTMLElement {
  if (!isStyleAdded) {
    isStyleAdded = true;
    addStyle(TOAST_CSS);
  }
  let $container = document.querySelector<HTMLElement>(`#${CONTAINER_ID}`);
  if ($container == null) {
    $container = document.createElement("div");
    $container.id = CONTAINER_ID;
    $container.setAttribute(SCRIPT_NODE_ATTR, "");
    (document.body ?? document.documentElement).appendChild($container);
  }
  return $container;
}

/** 显示提示 */
function show(type: ToastType, message: string, duration = 2200) {
  const $container = getContainer();
  const $toast = document.createElement("div");
  $toast.className = "dy-lite-toast";
  $toast.setAttribute("data-type", type);
  $toast.textContent = message;
  $container.appendChild($toast);
  setTimeout(() => {
    $toast.classList.add("dy-lite-toast--leave");
    let removed = false;
    const remove = () => {
      if (removed) {
        return;
      }
      removed = true;
      $toast.remove();
    };
    $toast.addEventListener("animationend", remove, { once: true });
    // 兜底：动画被外部样式干扰而不触发时，也要移除节点
    setTimeout(remove, 400);
  }, duration);
}

/** 消息提示 */
export const toast = {
  info: (message: string, duration?: number) => show("info", message, duration),
  success: (message: string, duration?: number) => show("success", message, duration),
  warning: (message: string, duration?: number) => show("warning", message, duration),
  error: (message: string, duration?: number) => show("error", message, duration),
};
