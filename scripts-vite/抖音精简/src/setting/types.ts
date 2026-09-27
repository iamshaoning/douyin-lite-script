/**
 * 设置面板的配置类型
 */

/** 下拉列表的选项 */
export interface PanelSelectOption<T = any> {
  /** 显示的文字 */
  text: string;
  /** 实际存储的值 */
  value: T;
}

interface PanelViewCommon {
  /** 左侧文字 */
  text?: string;
  /** 文字下方的描述，支持 html */
  description?: string;
}

/** 添加到列表后的回调容器 */
export interface PanelAfterAddContainer {
  /** 添加到列表中的 `<li>` */
  target: HTMLLIElement;
}

/** 开关 */
export interface PanelSwitchConfig extends PanelViewCommon {
  type: "switch";
  key: string;
  defaultValue: boolean;
  /** 该键被禁用（`.execMenu` 判断时强制为关闭状态） */
  disabled?: boolean;
  /** 点击后触发，返回 `true` 阻止写入存储 */
  clickCallBack?: (event: Event, value: boolean) => boolean | void;
  /** 存储值之后触发 */
  valueChangeCallback?: (event: Event, value: boolean) => void;
  /** 添加到列表后触发 */
  afterAddToUListCallBack?: (viewConfig: PanelSwitchConfig, container: PanelAfterAddContainer) => void;
}

/** 下拉列表 */
export interface PanelSelectConfig<T = any> extends PanelViewCommon {
  type: "select";
  key: string;
  defaultValue: T;
  data: PanelSelectOption<T>[] | (() => PanelSelectOption<T>[]);
  /** 选择后触发，返回 `true` 阻止写入存储 */
  selectCallBack?: (option: PanelSelectOption<T>) => boolean | void;
  /** 存储值之后触发 */
  valueChangeCallback?: (option: PanelSelectOption<T>) => void;
  /** 添加到列表后触发 */
  afterAddToUListCallBack?: (viewConfig: PanelSelectConfig<T>, container: PanelAfterAddContainer) => void;
}

/** 数字输入框 */
export interface PanelInputNumberConfig extends PanelViewCommon {
  type: "inputNumber";
  key: string;
  defaultValue: number | string;
  placeholder?: string;
  /** 输入后触发，返回 `true` 阻止写入存储 */
  changeCallback?: (event: Event, value: string, valueAsNumber: number) => boolean | void;
  /** 存储值之后触发 */
  valueChangeCallback?: (event: Event, value: string, valueAsNumber: number) => void;
  /** 添加到列表后触发，可用于调整输入框样式 */
  afterAddToUListCallBack?: (viewConfig: PanelInputNumberConfig, container: PanelAfterAddContainer) => void;
}

/** 自定义视图 */
export interface PanelOwnConfig {
  type: "own";
  /** 创建 `<li>`，返回的元素会被添加到列表中 */
  createLIElement: ($li: HTMLLIElement) => HTMLLIElement;
}

/** 容器（一组配置项） */
export interface PanelContainerConfig {
  type: "container";
  text?: string;
  views: PanelViewConfig[];
}

/** 深层菜单（点击后进入子页面） */
export interface PanelDeepMenuConfig {
  type: "deepMenu";
  text: string;
  views: PanelViewConfig[];
}

/** 所有视图配置 */
export type PanelViewConfig =
  | PanelSwitchConfig
  | PanelSelectConfig
  | PanelInputNumberConfig
  | PanelOwnConfig
  | PanelContainerConfig
  | PanelDeepMenuConfig;

/** 面板上的一个分类（左侧菜单项） */
export interface PanelContentConfig {
  id: string;
  title: string;
  views: PanelViewConfig[];
}
