/**
 * 「屏蔽 TA」快捷屏蔽
 *
 * 在聊天室的弹出菜单（资料卡 / 回复 TA）中追加一项「屏蔽 TA」，
 * 点击后做两件事：
 * + 把该条发言用户的 uid 加入聊天室消息过滤器的黑名单（不再显示其发言）
 * + 调用抖音官方接口拉黑该用户
 */
import { confirm } from "@/core/confirm";
import { SCRIPT_NODE_ATTR } from "@/core/dom";
import { toast } from "@/core/toast";
import { utils } from "@/core/utils";
import { BLOCK_ICON } from "@/main/live/douyin-live-block-icon";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";
import { DouYinUserBlock } from "@/main/user/douyin-user-block";
import { DouYinRouter } from "@/router/douyin-router";

/** React Fiber 节点（只用到向下查找 `originalList` 的几个字段） */
interface ReactFiberNode {
  memoizedProps?: any;
  return?: ReactFiberNode | null;
}

/** 抖音红，与另外两处「屏蔽 TA」保持一致 */
const DOUYIN_RED = "#fe2c55";

/**
 * 快捷屏蔽：给发言的弹出菜单追加一项「屏蔽 TA」
 *
 * 说明：菜单（资料卡 / 回复 TA）由抖音渲染在 body 下的 semi-portal 里，
 * 是一条独立的 React 渲染树，从菜单本身拿不到目标用户，所以目标 uid
 * 从被点击的那条发言上取：
 * + 点击发言的那一刻就把用户对象解析出来存下（不能拖到点菜单时再解析）
 * + 聊天列表是虚拟列表，行元素带 data-index，消息数组挂在列表组件的 props.originalList 上，
 *   即 originalList[data-index].payload.user；这期间列表可能滚动、行被回收复用，
 *   同一 index 已经不一定是同一条发言了
 */
export const DouYinLiveBlockUid = {
  /** 标记在注入的菜单项上，避免重复注入；标记不能打在菜单容器上，容器在菜单子项被重建后依然存在 */
  blockAttribute: "data-dy-live-block-uid",
  /** 最近一次被点击（含右键）的发言对应的用户对象 */
  $lastChatUser: null as any,
  /** 是否已初始化，避免重复注册监听与轮询 */
  $inited: false,
  init() {
    if (this.$inited) {
      return;
    }
    this.$inited = true;
    document.addEventListener(
      "click",
      (event) => {
        this.setLastChatItem(event);
      },
      true
    );
    document.addEventListener(
      "contextmenu",
      (event) => {
        this.setLastChatItem(event);
      },
      true
    );
    // 弹出菜单随开随关，轮询比监听 DOM 变更更省事也更稳
    // 标签页不可见时无法产生交互，跳过轮询避免后台空跑；站内切走直播间后同样无需再扫
    setInterval(() => {
      if (document.hidden || !DouYinRouter.isLive()) {
        return;
      }
      this.scanMenu();
    }, 500);
  },
  /**
   * 记录被点击的聊天条目对应的用户
   *
   * 解析放在这一瞬间做：等用户去点菜单时，虚拟列表可能已经复用掉这一行
   */
  setLastChatItem(event: Event) {
    const $target = event.target;
    if (!($target instanceof HTMLElement)) {
      return;
    }
    const $item = $target.closest<HTMLElement>(".webcast-chatroom___item");
    if ($item) {
      this.$lastChatUser = this.getItemUser($item);
    }
  },
  /**
   * 取某条发言的用户对象，取不到返回 null
   */
  getItemUser($item: HTMLElement | null): any {
    if (!$item) {
      return null;
    }
    const $row = $item.closest<HTMLElement>("[data-index]");
    if (!$row) {
      return null;
    }
    const index = parseInt($row.getAttribute("data-index") || "", 10);
    if (!(index >= 0)) {
      return null;
    }
    let fiber: ReactFiberNode | null | undefined = utils.getReactInstance($item)?.reactFiber;
    let $listProps: any = null;
    for (let depth = 0; depth < 20 && fiber; depth++) {
      const props = fiber.memoizedProps;
      if (props && Array.isArray(props.originalList)) {
        $listProps = props;
        break;
      }
      fiber = fiber.return;
    }
    if (!$listProps) {
      return null;
    }
    const message = $listProps.originalList[index];
    return (message && (message.payload?.user || message.user)) || null;
  },
  /**
   * 点击「屏蔽 TA」
   *
   * 拉黑不可轻率触发，先弹二次确认；
   * 确认后既把 uid 加进本地屏蔽名单（不再显示其发言），也调用抖音官方接口拉黑该用户；
   * 拉黑可能因为拿不到接口或 sec_uid 而失败，此时本地屏蔽依然生效
   */
  async blockCurrentUser() {
    const user = this.$lastChatUser;
    this.$lastChatUser = null;
    const uid = DouYinLiveMessageFilter.getUserId(user);
    this.closeMenu();
    if (!uid) {
      toast.error("没取到这条发言的uid，请到设置面板中手动添加");
      return;
    }
    const isConfirmed = await confirm("确定要屏蔽该用户吗？屏蔽后不再显示其发言，并同时拉黑对方。");
    if (!isConfirmed) {
      return;
    }
    const secUid = String(user?.sec_uid || user?.secUid || "");
    const isNewUid = DouYinLiveMessageFilter.addBlacklistUid(uid);
    const blockResult = await DouYinUserBlock.blockUser({ userId: uid, secUserId: secUid });
    const shieldText = isNewUid ? `已屏蔽 uid ${uid}` : `uid ${uid} 已在屏蔽列表中`;
    if (blockResult.success) {
      toast.success(`${shieldText}，并已拉黑 TA`, 4000);
    } else {
      toast.warning(`${shieldText}（拉黑失败：${blockResult.message}）`, 5000);
    }
  },
  /**
   * 关掉抖音自己的弹出菜单（点空白处即收起）
   */
  closeMenu() {
    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  },
  /**
   * 构造「屏蔽 TA」菜单项
   * @param $sample 已有的菜单项，用于复用样式
   */
  buildBlockItem($sample: HTMLElement) {
    const $item = document.createElement("li");
    $item.className = $sample.className;
    $item.setAttribute("role", "menuitem");
    $item.setAttribute("tabindex", "0");
    $item.setAttribute("aria-disabled", "false");
    // 标记为脚本注入的节点，避免被脚本自己的「页面扫描」当成页面的东西
    $item.setAttribute(SCRIPT_NODE_ATTR, "1");
    // 打在本项上作为「已注入」的判据
    $item.setAttribute(this.blockAttribute, "1");
    $item.innerHTML = /*html*/ `<div class="semi-dropdown-item-icon">${BLOCK_ICON}</div>屏蔽 TA`;
    // 复用的原生样式里文字是白色，这里单独涂成抖音红，让屏蔽入口更醒目
    $item.style.color = DOUYIN_RED;
    const $icon = $item.querySelector<HTMLElement>(".semi-dropdown-item-icon");
    if ($icon) {
      $icon.style.color = DOUYIN_RED;
    }
    $item.addEventListener(
      "click",
      (event) => {
        event.preventDefault();
        event.stopPropagation();
        void this.blockCurrentUser();
      },
      true
    );
    return $item;
  },
  /**
   * 检测并注入「屏蔽 TA」菜单项
   */
  scanMenu() {
    const $menuList = document.querySelectorAll<HTMLElement>("ul.semi-dropdown-menu");
    for (let index = 0; index < $menuList.length; index++) {
      const $menu = $menuList[index];
      // 只认发言的菜单（资料卡 / 回复 TA），页面上还有别的同名下拉
      const text = $menu.textContent || "";
      if (text.indexOf("资料卡") === -1 || text.indexOf("回复") === -1) {
        continue;
      }
      // 判据是本菜单里是否已有注入项：抖音会重建菜单子项，用容器标记会漏注入
      if ($menu.querySelector(`li[${this.blockAttribute}]`)) {
        continue;
      }
      const $sample = $menu.querySelector<HTMLElement>("li.semi-dropdown-item");
      if (!$sample) {
        continue;
      }
      $menu.appendChild(this.buildBlockItem($sample));
    }
  },
};
