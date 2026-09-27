/**
 * React 内部实例访问
 *
 * 抖音页面由 React 渲染，部分数据只能从 Fiber 节点上读取。
 */
import { selector, waitNode } from "@/core/dom";
import { log } from "@/core/log";
import { getReactInstance, isNull, waitPropertyByInterval } from "@/core/utils";

/** React 实例上的属性名 */
type ReactPropName = "reactFiber" | "reactContainer" | "reactProps" | "reactEvents" | "reactEventHandlers";

/** 等待 React 属性并处理的配置 */
interface ReactCheckPropOption {
  /** 日志提示 */
  msg?: string;
  /** 判断当前实例是否符合预期 */
  check(reactPropInst: any, $el: HTMLElement): boolean;
  /** 命中后处理 */
  set(reactPropInst: any, $el: HTMLElement): void;
  /** 等待结束仍未命中的回调（`isTimeout` 为 `true` 表示元素一直不存在） */
  failWait?(isTimeout: boolean): void;
}

/** 等待目标 */
type ReactWaitTarget = HTMLElement | string | (() => HTMLElement | null | undefined);

/** 等待 React 属性时检查的结果 */
interface CheckTargetResult {
  /** 是否命中 */
  status: boolean;
  /** 是否因为目标元素不存在而失败 */
  isTimeout: boolean;
  /** 命中的实例 */
  inst: any;
  /** 目标元素 */
  $el: HTMLElement | undefined;
}

/** 默认等待时间（ms） */
const WAIT_TIMEOUT = 10000;

/** 轮询间隔（ms） */
const WAIT_INTERVAL = 250;

function getWaitTarget(target: ReactWaitTarget): HTMLElement | null {
  if (typeof target === "string") {
    return selector<HTMLElement>(target) ?? null;
  }
  if (typeof target === "function") {
    return target() ?? null;
  }
  return target ?? null;
}

/**
 * 等待元素上的 React 属性并执行处理逻辑
 *
 * 与逐个 `option` 串行执行，命中的实例为该属性名对应的值
 */
const waitReactPropsToSet = async (
  target: ReactWaitTarget,
  reactPropNameOrNameList: ReactPropName | ReactPropName[],
  checkOption: ReactCheckPropOption | ReactCheckPropOption[]
): Promise<void> => {
  const optionList = Array.isArray(checkOption) ? checkOption : [checkOption];
  const propNameList = Array.isArray(reactPropNameOrNameList) ? reactPropNameOrNameList : [reactPropNameOrNameList];

  if (typeof target === "string") {
    const $target = await waitNode<HTMLElement>(target, WAIT_TIMEOUT);
    if ($target == null) {
      // 目标元素始终没出现，按 JSDoc 契约以「超时」通知各 option，而不是静默返回
      optionList.forEach((option) => {
        option.failWait?.(true);
      });
      return;
    }
  }

  const checkTarget = (option: ReactCheckPropOption): CheckTargetResult => {
    const $el = getWaitTarget(target);
    if ($el == null) {
      return { status: false, isTimeout: true, inst: undefined, $el: undefined };
    }
    const reactInst = getReactInstance($el);
    if (isNull(reactInst)) {
      return { status: false, isTimeout: false, inst: undefined, $el };
    }
    const matchedPropName = propNameList.find((propName) => {
      const reactPropInst = reactInst[propName];
      if (reactPropInst == null) {
        return false;
      }
      try {
        return option.check(reactPropInst, $el);
      } catch {
        return false;
      }
    });
    if (matchedPropName == null) {
      return { status: false, isTimeout: false, inst: undefined, $el };
    }
    return { status: true, isTimeout: false, inst: reactInst[matchedPropName], $el };
  };

  for (const option of optionList) {
    if (option.msg) {
      log.info(option.msg);
    }
    await waitPropertyByInterval(
      () => getWaitTarget(target),
      () => checkTarget(option).status,
      WAIT_INTERVAL,
      WAIT_TIMEOUT
    );
    const result = checkTarget(option);
    if (result.status) {
      option.set(result.inst, result.$el!);
    } else {
      option.failWait?.(result.isTimeout);
    }
  }
};

/** React 操作集合 */
export const ReactUtils = {
  waitReactPropsToSet,
};
