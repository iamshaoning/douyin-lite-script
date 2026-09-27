import { SCRIPT_NAME } from "@/core/gm";

type ConsoleMethod = "log" | "warn" | "error";

const STYLE_MAP = {
  log: "background:#3a3a44;color:#e8e8ea;",
  info: "background:#2b6cb0;color:#ffffff;",
  success: "background:#0eac0e;color:#ffffff;",
  warn: "background:#d69e2e;color:#ffffff;",
  error: "background:#e53e3e;color:#ffffff;",
} as const;

const PREFIX_STYLE = "padding:1px 6px;border-radius:3px;font-weight:600;margin-right:4px;";

function output(style: string, method: ConsoleMethod, args: unknown[]) {
  const prefixArg = `%c${SCRIPT_NAME}`;
  const styleArg = `${style}${PREFIX_STYLE}`;
  if (method === "warn") {
    console.warn(prefixArg, styleArg, ...args);
  } else if (method === "error") {
    console.error(prefixArg, styleArg, ...args);
  } else {
    console.log(prefixArg, styleArg, ...args);
  }
}

/** 带样式前缀的日志输出 */
export const log = {
  log: (...args: unknown[]) => output(STYLE_MAP.log, "log", args),
  info: (...args: unknown[]) => output(STYLE_MAP.info, "log", args),
  success: (...args: unknown[]) => output(STYLE_MAP.success, "log", args),
  warn: (...args: unknown[]) => output(STYLE_MAP.warn, "warn", args),
  error: (...args: unknown[]) => output(STYLE_MAP.error, "error", args),
};
