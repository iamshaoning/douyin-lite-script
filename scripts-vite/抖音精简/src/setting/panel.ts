/**
 * 设置面板
 *
 * 负责：
 * + 菜单执行（`exec` / `execMenu` / `execMenuOnce`）
 * + 值的读写与监听（委托给 `@/setting/value`）
 * + 设置界面的渲染（抖音配色）
 */
import { createElement, addStyle, removeStyle, SCRIPT_NODE_ATTR } from "@/core/dom";
import { GM_info, GM_registerMenuCommand, SCRIPT_NAME } from "@/core/gm";
import { log } from "@/core/log";
import { hasDefaultValue, isDisabledKey } from "@/setting/defaults";
import { PANEL_CSS } from "@/setting/panel-css";
import {
  PanelMenuResultsHandler,
  type PanelMenuExecMenuCallbackResult,
  type PanelMenuExecMenuResult,
} from "@/setting/panel-menu-results-handler";
import type {
  PanelAfterAddContainer,
  PanelContainerConfig,
  PanelContentConfig,
  PanelDeepMenuConfig,
  PanelInputNumberConfig,
  PanelOwnConfig,
  PanelSelectConfig,
  PanelSwitchConfig,
  PanelViewConfig,
} from "@/setting/types";
import {
  addValueChangeListener as addValueChangeListenerToStore,
  getValue,
  removeValueChangeListener as removeValueChangeListenerFromStore,
  setValue,
} from "@/setting/value";

/** `exec` 回调的入参 */
interface ExecMenuCallBackOption<T = any> {
  /** 判断的键名列表 */
  key: string[];
  /** 触发本次执行的值改变的键名 */
  triggerKey?: string;
  /** 键的当前值（多键时为数组） */
  value: T;
}

/** 单个已注册菜单的执行状态快照（用于功能自检） */
export interface PanelMenuExecState {
  /** 判断的键名列表 */
  keyList: string[];
  /** 当前是否处于执行状态（与回调是否会执行的判断一致） */
  enable: boolean;
  /** 已托管的资源数量（样式元素 + 卸载函数） */
  resourceCount: number;
  /** 重新执行回调（会先清理上一次的托管内容） */
  reload(): void;
}

/** `exec` 的返回值 */
interface OnceExecMenuStoreData {
  /** 判断当前菜单是否处于开启状态 */
  checkMenuExec(): boolean;
  /** 判断的键名列表 */
  keyList: string[];
  /** 已托管的资源数量（样式元素 + 卸载函数） */
  getResourceCount(): number;
  /** 重新执行回调（会先清理上一次的托管内容） */
  reload(): void;
  /** 清理托管内容并移除监听 */
  clear(): void;
  /** 移除已托管的元素 */
  clearStoreNodeList(): void;
  /** 执行卸载函数并清空 */
  execDestroyFnAndClear(): void;
  /** 移除值改变监听 */
  removeValueChangeListener(): void;
  /** 清理 `exec` 的执行记录 */
  clearOnceExecMenuData(): void;
}

/** 主动触发 url 改变时传入给监听回调的配置 */
interface UrlChangeWithExecMenuOnceEventConfig {
  /** 当前 url */
  url?: string;
  /** 改变前的 url */
  beforeUrl?: string;
}

/** 面板会话（一次 `showPanel` 的生命周期） */
interface PanelSession {
  $mask: HTMLElement;
  /** 本次会话注册的值改变监听 id */
  listenerIdList: number[];
  /** 当前是否处于打开状态 */
  isOpened: boolean;
}

class PanelClass {
  /** 供业务层读取的数据 */
  readonly $data = {
    /** 脚本名 */
    scriptName: SCRIPT_NAME,
    /** 已注册的设置分类 */
    contentConfigList: [] as PanelContentConfig[],
    /** `exec` 的执行记录，键为 `JSON.stringify(keyList)` */
    onceExecMenuData: new Map<string, OnceExecMenuStoreData>(),
    /** url 改变时需要重载的菜单回调 */
    urlChangeReloadMenuExecOnce: new Map<string, () => any>(),
  };

  /** 当前的设置界面会话 */
  #session: PanelSession | null = null;
  /** 设置界面的内存导航栈（deepMenu） */
  #navStack: { text: string; views: PanelViewConfig[] }[] = [];

  /** 注册设置分类 */
  addContentConfig(config: PanelContentConfig | PanelContentConfig[]) {
    const configList = Array.isArray(config) ? config : [config];
    this.$data.contentConfigList.push(...configList);
  }

  /** 初始化 */
  init() {
    this.#registerMenuCommand();
  }

  /* ------------------------------ 值的读写 ------------------------------ */

  /** 获取值（存储值 → 注册的默认值 → 入参默认值） */
  getValue<T = any>(key: string, defaultValue?: T): T {
    return getValue<T>(key, defaultValue);
  }

  /** 设置值 */
  setValue(key: string, value: any) {
    setValue(key, value);
  }

  /**
   * 监听值的改变
   *
   * @param option.immediate 立即触发本回调（不触发其它监听）
   * @param option.immediateAll 立即触发所有监听该键的回调
   */
  addValueChangeListener(
    key: string,
    callback: (key: string, newValue: any, oldValue: any) => void,
    option?: { immediate?: boolean; immediateAll?: boolean }
  ): number {
    return addValueChangeListenerToStore(key, callback, option);
  }

  /** 移除监听 */
  removeValueChangeListener(listenerId: number) {
    removeValueChangeListenerFromStore(listenerId);
  }

  /* ------------------------------ 菜单执行 ------------------------------ */

  /**
   * 键的归一化
   *
   * + 多键：排序后 `JSON.stringify`
   * + 单键：取该键本身
   * + 空数组：原样返回
   */
  transformKey(key: string | string[]): string | string[] {
    if (Array.isArray(key)) {
      if (key.length > 1) {
        return JSON.stringify(key.sort());
      }
      if (key.length === 1) {
        return key[0];
      }
    }
    return key;
  }

  /**
   * 执行菜单
   *
   * @param queryKey 判断的键，多键时它们是与关系
   * @param callback 执行的回调，返回的元素会被托管，返回的函数视为卸载函数
   * @param checkExec 自定义是否执行回调的判断，默认判断所有键的值都为真
   * @param once 是否只执行一次并监听值改变，默认 `true`
   */
  async exec<T = any>(
    queryKey: string | string[] | (() => string | string[]),
    callback: (option: ExecMenuCallBackOption<T>) => PanelMenuExecMenuCallbackResult,
    checkExec?: (keyList: string[]) => boolean,
    once: boolean = true
  ): Promise<OnceExecMenuStoreData | undefined> {
    const queryKeyResult = typeof queryKey === "function" ? queryKey() : queryKey;
    const isArrayKey = Array.isArray(queryKeyResult);
    const keyList = isArrayKey ? [...(queryKeyResult as string[])] : [queryKeyResult as string];
    const notExistKey = keyList.find((key) => !hasDefaultValue(key));
    if (notExistKey != null) {
      log.warn(`${notExistKey} 键不存在`);
      return;
    }
    const storageKey = JSON.stringify(keyList);
    if (once) {
      const storedResult = this.$data.onceExecMenuData.get(storageKey);
      if (storedResult) {
        return storedResult;
      }
    }
    const listenerIdList: number[] = [];
    const handler = new PanelMenuResultsHandler({
      keyList,
      getValue: (key) => Boolean(this.getValue(key)),
      checkExec:
        typeof checkExec === "function" ? checkExec : (keyList) => keyList.every((key) => Boolean(this.getValue(key))),
    });
    /** 值改变时触发的回调 */
    const valueChangeCallback = async (valueOption?: { key: string; newValue: any; oldValue: any }) => {
      const execFlag = handler.checkMenuExec();
      let callbackResult: PanelMenuExecMenuResult;
      if (execFlag) {
        const valueList = keyList.map((key) => this.getValue<T>(key));
        callbackResult = await callback({
          key: keyList,
          triggerKey: valueOption?.key,
          value: (isArrayKey ? valueList : valueList[0]) as T,
        });
      }
      handler.handlerResult(execFlag, callbackResult);
    };
    if (once) {
      keyList.forEach((key) => {
        listenerIdList.push(
          this.addValueChangeListener(key, (key, newValue, oldValue) =>
            valueChangeCallback({ key, newValue, oldValue })
          )
        );
      });
    }
    await valueChangeCallback();

    const result: OnceExecMenuStoreData = {
      keyList,
      checkMenuExec: () => handler.checkMenuExec(),
      getResourceCount: () => handler.getStoredResourceCount(),
      reload: () => {
        handler.clearStoreNodeList();
        handler.execDestroyFnAndClear();
        valueChangeCallback();
      },
      clear: () => {
        handler.clearStoreNodeList();
        handler.execDestroyFnAndClear();
        result.removeValueChangeListener();
        result.clearOnceExecMenuData();
      },
      clearStoreNodeList: () => handler.clearStoreNodeList(),
      execDestroyFnAndClear: () => handler.execDestroyFnAndClear(),
      removeValueChangeListener: () => {
        listenerIdList.forEach((listenerId) => this.removeValueChangeListener(listenerId));
        listenerIdList.length = 0;
      },
      clearOnceExecMenuData: () => {
        if (once) {
          this.$data.onceExecMenuData.delete(storageKey);
        }
      },
    };
    this.$data.onceExecMenuData.set(storageKey, result);
    return result;
  }

  /**
   * 根据菜单的开关状态执行回调
   *
   * @param isReverse 逆反判断
   * @param once 是否只执行一次并监听值改变，默认 `false`
   */
  async execMenu<T = any>(
    key: string | string[],
    callback: (option: ExecMenuCallBackOption<T>) => PanelMenuExecMenuCallbackResult,
    isReverse: boolean = false,
    once: boolean = false
  ) {
    return await this.exec<T>(
      key,
      callback,
      (keyList) =>
        keyList.every((__key__) => {
          let flag = Boolean(this.getValue(__key__));
          if (isDisabledKey(__key__)) {
            flag = false;
            log.warn(`execMenu${once ? "Once" : ""} ${__key__} 被禁用`);
          }
          return isReverse ? !flag : flag;
        }),
      once
    );
  }

  /**
   * 根据菜单的开关状态执行回调，只会执行一次
   *
   * @param listenUrlChange 是否监听 url 改变并重载菜单执行，默认 `false`
   */
  async execMenuOnce<T = any>(
    key: string | string[],
    callback: (option: ExecMenuCallBackOption<T>) => PanelMenuExecMenuCallbackResult,
    isReverse: boolean = false,
    listenUrlChange: boolean = false
  ) {
    const result = await this.execMenu<T>(key, callback, isReverse, true);
    if (listenUrlChange && result) {
      const urlChangeCallback = () => {
        result.reload();
      };
      this.removeUrlChangeWithExecMenuOnceListener(key);
      this.addUrlChangeWithExecMenuOnceListener(key, urlChangeCallback);
    }
    return result;
  }

  /** 添加 url 改变时的重载回调 */
  addUrlChangeWithExecMenuOnceListener(key: string | string[], callback: () => any) {
    const transformKey = this.transformKey(key);
    if (typeof transformKey !== "string") {
      return { off: () => {} };
    }
    this.$data.urlChangeReloadMenuExecOnce.set(transformKey, callback);
    return {
      off: () => {
        this.removeUrlChangeWithExecMenuOnceListener(transformKey);
      },
    };
  }

  /** 移除 url 改变时的重载回调 */
  removeUrlChangeWithExecMenuOnceListener(key: string | string[]) {
    const transformKey = this.transformKey(key);
    if (typeof transformKey === "string") {
      this.$data.urlChangeReloadMenuExecOnce.delete(transformKey);
    }
  }

  /** 是否存在 url 改变时的重载回调 */
  hasUrlChangeWithExecMenuOnceListener(key: string | string[]) {
    const transformKey = this.transformKey(key);
    return typeof transformKey === "string" && this.$data.urlChangeReloadMenuExecOnce.has(transformKey);
  }

  /** 主动触发 url 改变时的重载回调 */
  async emitUrlChangeWithExecMenuOnceEvent(config?: UrlChangeWithExecMenuOnceEventConfig) {
    for (const callback of [...this.$data.urlChangeReloadMenuExecOnce.values()]) {
      await callback();
    }
  }

  /**
   * 获取已注册菜单的执行状态快照
   *
   * 用于功能自检：`enable` 为真而 `resourceCount` 为 `0`，说明回调没有执行或没有返回可托管的内容，
   * 即该功能实际上没有生效。
   */
  getMenuExecStateList(): PanelMenuExecState[] {
    return Array.from(this.$data.onceExecMenuData.values()).map((result) => ({
      keyList: [...result.keyList],
      enable: result.checkMenuExec(),
      resourceCount: result.getResourceCount(),
      reload: () => result.reload(),
    }));
  }

  /* ------------------------------ 设置界面 ------------------------------ */

  /** 注册油猴菜单命令 */
  #registerMenuCommand() {
    const menuCommandCallback = () => {
      this.showPanel(this.$data.contentConfigList);
    };
    GM_registerMenuCommand(`设置`, menuCommandCallback);
    // 快捷开关：等价于点按设置里的「显示聊天室浮动入口」，切换后由该键的监听同步入口
    GM_registerMenuCommand(`聊天室浮动入口开关`, () => {
      this.setValue("live-danmu-filter-entry-show", !this.getValue("live-danmu-filter-entry-show", true));
    });
  }

  /** 显示设置界面 */
  showPanel(content: PanelContentConfig[], title: string = `${SCRIPT_NAME}-设置`) {
    // 先关闭已打开的面板
    this.closePanel();
    const $mask = createElement("div", { className: "dyl-panel-mask" });
    // 标记为脚本注入的节点，避免被自身的页面扫描逻辑命中
    $mask.setAttribute(SCRIPT_NODE_ATTR, "");
    const $panel = createElement("div", { className: "dyl-panel" });
    const $header = createElement("div", { className: "dyl-panel-header" });
    const $headerTitle = createElement("div", { className: "dyl-panel-header-title" });
    $headerTitle.textContent = title;
    const $close = createElement("div", { className: "dyl-panel-header-close" });
    $close.textContent = "✕";
    $close.addEventListener("click", () => this.closePanel());
    $header.append($headerTitle, $close);

    const $body = createElement("div", { className: "dyl-panel-body" });
    const $menu = createElement("div", { className: "dyl-panel-menu" });
    const $content = createElement("div", { className: "dyl-panel-content" });
    $body.append($menu, $content);

    const $footer = createElement("div", { className: "dyl-panel-footer" });
    $footer.textContent = `v${GM_info.script.version}`;

    $panel.append($header, $body, $footer);
    $mask.append($panel);

    const $panelStyle = addStyle(PANEL_CSS);

    const session: PanelSession = { $mask, listenerIdList: [], isOpened: true };
    this.#session = session;

    // 点击遮罩关闭
    $mask.addEventListener("click", (event) => {
      if (event.target === $mask) {
        this.closePanel();
      }
    });
    // ESC 关闭
    const keydownCallback = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        this.closePanel();
      }
    };
    window.addEventListener("keydown", keydownCallback);

    const contentList = content.filter((it) => it.views && it.views.length > 0);
    let activeIndex = 0;
    /** 渲染右侧内容区 */
    const renderContent = () => {
      $content.textContent = "";
      const navItem = this.#navStack.at(-1);
      if (navItem) {
        const $back = createElement("div", { className: "dyl-panel-back" });
        $back.textContent = "‹ 返回";
        $back.addEventListener("click", () => {
          this.#navStack.pop();
          renderContent();
        });
        $content.append($back);
      }
      const viewList = navItem ? navItem.views : (contentList[activeIndex]?.views ?? []);
      $content.append(this.#renderViewList(viewList, session));
    };
    contentList.forEach((config, index) => {
      const $item = createElement("div", { className: "dyl-panel-menu-item" });
      $item.textContent = config.title;
      $item.addEventListener("click", () => {
        activeIndex = index;
        this.#navStack = [];
        $menu
          .querySelectorAll(".dyl-panel-menu-item")
          .forEach(($el) => $el.classList.remove("dyl-panel-menu-item--active"));
        $item.classList.add("dyl-panel-menu-item--active");
        $content.scrollTop = 0;
        renderContent();
      });
      if (index === 0) {
        $item.classList.add("dyl-panel-menu-item--active");
      }
      $menu.append($item);
    });
    renderContent();

    document.body.append($mask);
    // 打开 deepMenu 时替换内容区的渲染入口
    this.#openDeepMenu = (deepMenu) => {
      this.#navStack.push({ text: deepMenu.text, views: deepMenu.views });
      $content.scrollTop = 0;
      renderContent();
    };
    this.#closePanelCallback = () => {
      window.removeEventListener("keydown", keydownCallback);
      session.listenerIdList.forEach((listenerId) => this.removeValueChangeListener(listenerId));
      session.listenerIdList.length = 0;
      session.isOpened = false;
      $mask.remove();
      // 释放本次会话对面板样式的引用，关闭后不再需要
      removeStyle($panelStyle);
      if (this.#session === session) {
        this.#session = null;
      }
    };
    return { $mask, $panel, content: contentList };
  }

  /** 关闭设置界面时执行的清理（由 `showPanel` 赋值） */
  #closePanelCallback: (() => void) | null = null;
  /** 打开深层菜单（由 `showPanel` 赋值） */
  #openDeepMenu: ((deepMenu: PanelDeepMenuConfig) => void) | null = null;

  /** 关闭设置界面 */
  closePanel() {
    this.#closePanelCallback?.();
    this.#closePanelCallback = null;
    this.#navStack = [];
  }

  /* --------------------------- 设置界面的渲染 --------------------------- */

  /** 渲染一组配置 */
  #renderViewList(views: PanelViewConfig[], session: PanelSession): HTMLElement {
    const $wrapper = createElement("div");
    let $currentList: HTMLUListElement | null = null;
    /** 获取（或创建）承载普通配置项的容器 */
    const ensureContainer = () => {
      if ($currentList) {
        return $currentList;
      }
      const $container = createElement("div", { className: "dyl-panel-container" });
      const $list = createElement("ul", { className: "dyl-panel-list" });
      $container.append($list);
      $wrapper.append($container);
      $currentList = $list;
      return $list;
    };
    for (const view of views) {
      if (view.type === "container") {
        $currentList = null;
        $wrapper.append(this.#renderContainer(view, session));
      } else if (view.type === "deepMenu") {
        ensureContainer().append(this.#renderDeepMenu(view));
      } else {
        ensureContainer().append(this.#renderItem(view, session));
      }
    }
    return $wrapper;
  }

  /** 渲染容器 */
  #renderContainer(container: PanelContainerConfig, session: PanelSession): HTMLElement {
    const $container = createElement("div", { className: "dyl-panel-container" });
    if (container.text) {
      const $title = createElement("div", { className: "dyl-panel-container-title" });
      $title.textContent = container.text;
      $container.append($title);
    }
    const $list = createElement("ul", { className: "dyl-panel-list" });
    for (const view of container.views) {
      if (view.type === "container") {
        // 嵌套容器
        $container.append(this.#renderContainer(view, session));
        continue;
      }
      if (view.type === "deepMenu") {
        $list.append(this.#renderDeepMenu(view));
        continue;
      }
      $list.append(this.#renderItem(view, session));
    }
    if ($list.childElementCount) {
      $container.append($list);
    }
    return $container;
  }

  /** 渲染深层菜单项 */
  #renderDeepMenu(deepMenu: PanelDeepMenuConfig): HTMLLIElement {
    const $li = createElement("li", { className: "dyl-panel-item dyl-panel-deep-menu" });
    const $text = createElement("div", { className: "dyl-panel-item-text" });
    $text.innerHTML = `<p class="dyl-panel-item-text-main">${deepMenu.text}</p>`;
    const $arrow = createElement("div", { className: "dyl-panel-deep-menu-arrow" });
    $arrow.textContent = "›";
    $li.append($text, $arrow);
    $li.addEventListener("click", () => {
      this.#openDeepMenu?.(deepMenu);
    });
    return $li;
  }

  /** 渲染普通配置项 */
  #renderItem(view: PanelViewConfig, session: PanelSession): HTMLLIElement {
    const $li = createElement("li", { className: "dyl-panel-item" });
    switch (view.type) {
      case "switch":
        this.#renderSwitch(view, $li, session);
        break;
      case "select":
        this.#renderSelect(view, $li, session);
        break;
      case "inputNumber":
        this.#renderInputNumber(view, $li, session);
        break;
      case "own":
        this.#renderOwn(view, $li);
        break;
    }
    return $li;
  }

  /** 创建左侧文字区 */
  #createItemText(text?: string, description?: string): HTMLElement {
    const $text = createElement("div", { className: "dyl-panel-item-text" });
    const $main = createElement("p", { className: "dyl-panel-item-text-main" });
    $main.textContent = text ?? "";
    $text.append($main);
    if (description) {
      const $desc = createElement("p", { className: "dyl-panel-item-text-desc" });
      $desc.innerHTML = description;
      $text.append($desc);
    }
    return $text;
  }

  /** 渲染开关 */
  #renderSwitch(view: PanelSwitchConfig, $li: HTMLLIElement, session: PanelSession) {
    $li.append(this.#createItemText(view.text, view.description));
    const $switch = createElement("div", { className: "dyl-switch" });
    if (view.disabled) {
      $switch.classList.add("dyl-switch--disabled");
    }
    const updateView = (value: boolean) => {
      $switch.classList.toggle("dyl-switch--on", Boolean(value));
    };
    updateView(Boolean(this.getValue(view.key, view.defaultValue)));
    session.listenerIdList.push(
      this.addValueChangeListener(view.key, (_key, newValue) => {
        updateView(Boolean(newValue));
      })
    );
    $switch.addEventListener("click", (event) => {
      if (view.disabled) {
        return;
      }
      const newValue = !Boolean(this.getValue(view.key, view.defaultValue));
      if (view.clickCallBack?.(event, newValue)) {
        return;
      }
      this.setValue(view.key, newValue);
      updateView(newValue);
      view.valueChangeCallback?.(event, newValue);
    });
    $li.append($switch);
  }

  /** 渲染下拉列表 */
  #renderSelect(view: PanelSelectConfig, $li: HTMLLIElement, session: PanelSession) {
    $li.append(this.#createItemText(view.text, view.description));
    const optionList = typeof view.data === "function" ? view.data() : view.data;
    const $select = createElement("select", { className: "dyl-panel-select" });
    optionList.forEach((option, index) => {
      const $option = createElement("option");
      $option.value = String(index);
      $option.textContent = option.text;
      $select.append($option);
    });
    const updateView = (value: any) => {
      const index = optionList.findIndex((option) => String(option.value) === String(value));
      $select.value = String(index === -1 ? 0 : index);
    };
    updateView(this.getValue(view.key, view.defaultValue));
    session.listenerIdList.push(
      this.addValueChangeListener(view.key, (_key, newValue) => {
        updateView(newValue);
      })
    );
    $select.addEventListener("change", () => {
      const option = optionList[Number($select.value)];
      if (!option) {
        return;
      }
      if (view.selectCallBack?.(option)) {
        updateView(this.getValue(view.key, view.defaultValue));
        return;
      }
      this.setValue(view.key, option.value);
      view.valueChangeCallback?.(option);
    });
    $li.append($select);
  }

  /** 渲染数字输入框 */
  #renderInputNumber(view: PanelInputNumberConfig, $li: HTMLLIElement, session: PanelSession) {
    $li.append(this.#createItemText(view.text, view.description));
    const $input = createElement("input", {
      className: "dyl-panel-input",
      type: "number",
      placeholder: view.placeholder,
    });
    const updateView = (value: any) => {
      $input.value = value == null ? "" : String(value);
    };
    updateView(this.getValue(view.key, view.defaultValue));
    session.listenerIdList.push(
      this.addValueChangeListener(view.key, (_key, newValue) => {
        updateView(newValue);
      })
    );
    $input.addEventListener("change", (event) => {
      const value = $input.value;
      let valueAsNumber = $input.valueAsNumber;
      if (valueAsNumber == null || Number.isNaN(valueAsNumber)) {
        valueAsNumber = Number(view.defaultValue);
      }
      if (view.changeCallback?.(event, value, valueAsNumber)) {
        updateView(this.getValue(view.key, view.defaultValue));
        return;
      }
      this.setValue(view.key, value);
      view.valueChangeCallback?.(event, value, valueAsNumber);
    });
    $li.append($input);
    const container: PanelAfterAddContainer = { target: $li };
    view.afterAddToUListCallBack?.(view, container);
  }

  /** 渲染自定义视图 */
  #renderOwn(view: PanelOwnConfig, $li: HTMLLIElement) {
    const $result = view.createLIElement($li);
    if ($result instanceof HTMLElement && $result !== $li) {
      $li.className = $result.className;
      $li.innerHTML = $result.innerHTML;
      while ($result.firstChild) {
        $li.append($result.firstChild);
      }
    }
  }
}

export const Panel = new PanelClass();
