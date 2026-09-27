/**
 * 菜单执行结果的托管
 *
 * 回调返回的元素会被收集起来，在下一次执行（或被关闭）时统一移除；
 * 回调返回的函数视为卸载函数，同样在下次执行前统一调用。
 */
import { removeStyle } from "@/core/dom";

/** 菜单执行结果中的托管对象 */
interface PanelMenuExecMenuResultInstance {
  /** 需要托管的样式元素，键位关闭时会被移除 */
  $css?: (Element | null | undefined)[] | Element | null | undefined;
  /** 键位关闭时执行的卸载函数 */
  destroy?: () => void;
}

/** 菜单执行结果 */
export type PanelMenuExecMenuResult =
  | PanelMenuExecMenuResultInstance
  | Element
  | null
  | undefined
  | void
  | (() => void)
  | (Element | null | undefined | (() => void))[];

/** 菜单执行回调的返回值，允许返回 `Promise` */
export type PanelMenuExecMenuCallbackResult = PanelMenuExecMenuResult | Promise<PanelMenuExecMenuResult>;

/** 创建处理器时的配置 */
interface PanelMenuResultHandlerOption {
  /** 需要判断执行的键名列表 */
  keyList: string[];
  /** 获取键的是否启用 */
  getValue: (key: string) => boolean;
  /**
   * 自定义执行判断
   *
   * 传入该函数时，`keyList` 会作为入参传入
   */
  checkExec?: (keyList: string[]) => boolean;
}

export class PanelMenuResultsHandler {
  #storeNodeList: Element[] = [];
  #destroyFnList: (() => void)[] = [];
  #option: PanelMenuResultHandlerOption;

  constructor(option: PanelMenuResultHandlerOption) {
    this.#option = option;
  }

  /**
   * 处理返回值
   *
   * + 先清理上一次托管的元素与卸载函数
   * + `enableValue` 为真时，把本次返回的元素与卸载函数追加进托管列表
   *
   * @param enableValue 启用状态
   * @param args 支持 `Element` / `Function` / `{$css, destroy}` / 数组（可嵌套）
   */
  handlerResult(enableValue: boolean, args: PanelMenuExecMenuResult) {
    const dynamicStoreNodeList: Element[] = [];
    const dynamicDestroyFnList: (() => void)[] = [];

    /** 展平结果，得到 `Element` 与卸载函数的列表 */
    const flatResult = (target: unknown, result: unknown[]) => {
      if (Array.isArray(target)) {
        for (const item of target) {
          flatResult(item, result);
        }
        return;
      }
      if (typeof target === "object" && target != null) {
        if (target instanceof Element) {
          result.push(target);
          return;
        }
        const { $css, destroy } = target as PanelMenuExecMenuResultInstance;
        if ($css != null) {
          if (Array.isArray($css)) {
            for (const item of $css) {
              if (item instanceof Element) {
                result.push(item);
              }
            }
          } else if ($css instanceof Element) {
            result.push($css);
          }
        }
        if (typeof destroy === "function") {
          result.push(destroy);
        }
        return;
      }
      if (typeof target === "function" || target != null) {
        result.push(target);
      }
    };

    const resultValueList: unknown[] = [];
    flatResult(args, resultValueList);

    for (const item of resultValueList) {
      if (item == null) {
        continue;
      }
      if (item instanceof Element) {
        dynamicStoreNodeList.push(item);
      } else if (typeof item === "function") {
        dynamicDestroyFnList.push(item as () => void);
      }
    }

    // 先执行旧的卸载函数并移除旧的元素，再托管新的
    this.clearStoreNodeList();
    this.execDestroyFnAndClear();
    if (enableValue) {
      this.#storeNodeList = this.#storeNodeList.concat(dynamicStoreNodeList);
      this.#destroyFnList = this.#destroyFnList.concat(dynamicDestroyFnList);
    }
  }

  /** 获取键的是否启用 */
  getEnableStatus(key: string): boolean {
    return Boolean(this.#option.getValue(key));
  }

  /**
   * 已托管的资源数量（样式元素 + 卸载函数）
   *
   * 键处于启用状态时，若该值为 `0`，说明回调没有执行或没有返回任何可托管的内容，
   * 即对应的功能实际上没有生效，可用于功能自检。
   */
  getStoredResourceCount(): number {
    return this.#storeNodeList.length + this.#destroyFnList.length;
  }

  /** 判断是否执行 */
  checkMenuExec(): boolean {
    if (typeof this.#option.checkExec === "function") {
      return this.#option.checkExec(this.#option.keyList);
    }
    return this.#option.keyList.every((key) => this.getEnableStatus(key));
  }

  /** 移除已托管的元素 */
  clearStoreNodeList = () => {
    for (let index = this.#storeNodeList.length - 1; index >= 0; index--) {
      // 样式元素可能被多处复用，交由引用计数决定是否真正移除
      removeStyle(this.#storeNodeList[index]);
      this.#storeNodeList.splice(index, 1);
    }
  };

  /** 执行卸载函数并清空 */
  execDestroyFnAndClear = () => {
    for (let index = this.#destroyFnList.length - 1; index >= 0; index--) {
      this.#destroyFnList[index]();
      this.#destroyFnList.splice(index, 1);
    }
  };
}
