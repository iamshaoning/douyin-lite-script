/**
 * Cookie 管理
 *
 * 使用 `document.cookie` 写入，不依赖油猴的 `GM_cookie`，
 * 避免脚本管理器提示需要敏感权限。
 */

interface CookieSetOptions {
  name: string;
  value: string;
  domain?: string;
  path?: string;
  secure?: boolean;
  /** 过期时间（Unix 时间戳，单位秒） */
  expirationDate?: number;
}

type CookieError = string | Error | null | undefined;

/** 使用 document.cookie 写入 */
const setByDocument = (option: CookieSetOptions): CookieError => {
  const segments = [`${option.name}=${option.value}`];
  if (option.domain != null) {
    segments.push(`domain=${option.domain}`);
  }
  segments.push(`path=${option.path ?? "/"}`);
  if (option.expirationDate != null) {
    segments.push(`expires=${new Date(option.expirationDate * 1000).toUTCString()}`);
  }
  if (option.secure) {
    segments.push("secure");
  }
  document.cookie = segments.join("; ");
  return null;
};

/** Cookie 管理实例 */
export const cookieManager = {
  /** 更新 Cookie */
  update(option: CookieSetOptions, callback?: (error: CookieError) => void): Promise<CookieError> {
    return new Promise<CookieError>((resolve) => {
      const finish = (error: CookieError) => {
        callback?.(error);
        resolve(error);
      };
      try {
        finish(setByDocument(option));
      } catch (error) {
        finish(error as Error);
      }
    });
  },
};
