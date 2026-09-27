/**
 * 视频评论区「点击用户名」快捷菜单
 *
 * 抖音评论区点击用户名会直接跳到对方主页，想拉黑还得在主页里再点一次。
 * 这里拦截用户名（不含头像）的点击，改为弹出一个仿直播聊天室弹出菜单的小菜单：
 * + 进主页：仍走抖音自己的路由跳转
 * + 屏蔽 TA：直接调用抖音官方接口拉黑
 */
import { confirm } from "@/core/confirm";
import { addStyle, DOMUtils, preventEvent, SCRIPT_NODE_ATTR } from "@/core/dom";
import { toast } from "@/core/toast";
import { utils } from "@/core/utils";
import { BLOCK_ICON } from "@/main/live/douyin-live-block-icon";
import { DouYinUserBlock } from "@/main/user/douyin-user-block";

/** 菜单容器 id */
const MENU_ID = "dy-video-comment-user-menu";

/** 「屏蔽 TA」菜单项的标记，用来单独给它上抖音红 */
const BLOCK_ITEM_ATTR = "data-dy-block-item";

/** 抖音红，与另外两处「屏蔽 TA」保持一致 */
const DOUYIN_RED = "#fe2c55";

/** 「进主页」图标 */
const HOME_ICON = /*html*/ `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="5" r="2.7" stroke="currentColor" stroke-width="1.3"/><path d="M2.8 13.6c0-2.3 2.3-3.7 5.2-3.7s5.2 1.4 5.2 3.7" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;

/**
 * 菜单样式
 *
 * 元素同时带 semi 的类名，但 semi 的配色走 `--semi-color-*` 变量，
 * 而页面把文字色变量定义在了 `body` 上（浅色 `rgba(249,249,249,1)`），
 * 与本脚本的浅色菜单底叠加后就变成了「浅底浅字」看不见。
 * 所以这里不再依赖 semi 变量，用 id 选择器把底色与文字色都显式定死，
 * 取抖音自身下拉菜单的深色底，浅色/深色模式下外观都一致。
 */
const MENU_CSS = /*css*/ `
#${MENU_ID} {
  position: fixed;
  z-index: 10000;
  margin: 0;
  padding: 4px;
  list-style: none;
  min-width: 120px;
  border-radius: 8px;
  background-color: #252632;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.32);
  font-size: 14px;
  line-height: 22px;
  color: #fff;
  user-select: none;
}
#${MENU_ID},
#${MENU_ID} > li,
#${MENU_ID} > li > span {
  color: #fff;
}
#${MENU_ID} > li {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
}
#${MENU_ID} > li:hover {
  background-color: rgba(255, 255, 255, 0.12);
}
#${MENU_ID} > li > .semi-dropdown-item-icon {
  display: flex;
  align-items: center;
  color: rgba(255, 255, 255, 0.7);
}
/* 「屏蔽 TA」用抖音红，比其它项更醒目 */
#${MENU_ID} > li[${BLOCK_ITEM_ATTR}],
#${MENU_ID} > li[${BLOCK_ITEM_ATTR}] > span,
#${MENU_ID} > li[${BLOCK_ITEM_ATTR}] > .semi-dropdown-item-icon {
  color: ${DOUYIN_RED};
}
`;

/** 菜单当前对应的用户 */
interface MenuUser {
  /** 用户 id，取不到为空字符串 */
  uid: string;
  /** 用户 sec_uid，来自用户名链接的 href */
  secUid: string;
  /** 被点击的用户名链接 */
  $link: HTMLAnchorElement;
}

export const DouYinVideoCommentUserMenu = {
  /** 当前菜单对应的用户，菜单关闭后置空 */
  $currentUser: null as MenuUser | null,
  /** 由「进主页」发起的模拟点击，需放行一次，避免被自己再次拦截 */
  $passClickLink: null as HTMLAnchorElement | null,
  /** 是否已初始化 */
  $inited: false,
  init() {
    if (this.$inited) {
      return;
    }
    this.$inited = true;
    addStyle(MENU_CSS);
    // 捕获阶段拦截，抢在抖音自己的跳转逻辑之前
    DOMUtils.on(
      document,
      "click",
      'a[href*="/user/"]',
      (event, $link) => {
        this.onClickUserLink(event, $link);
      },
      { capture: true, overrideTarget: false }
    );
    // 点击菜单外部关闭菜单
    DOMUtils.on(
      document,
      "mousedown",
      (event) => {
        const $target = event.target;
        if (!($target instanceof Node)) {
          return;
        }
        const $menu = document.getElementById(MENU_ID);
        if ($menu && $menu.contains($target)) {
          return;
        }
        this.closeMenu();
      },
      { capture: true }
    );
    // 菜单是 fixed 定位，页面滚动后会错位，直接关掉
    DOMUtils.on(window, "scroll", () => this.closeMenu(), { capture: true });
  },
  /**
   * 点击用户链接时判断是否需要接管
   */
  onClickUserLink(event: Event, $link: HTMLElement | undefined) {
    if (!$link || !($link instanceof HTMLAnchorElement)) {
      return;
    }
    // 「进主页」自己发出的模拟点击，放行
    if (this.$passClickLink === $link) {
      return;
    }
    // 只管评论区的链接
    if (!$link.closest('[data-e2e="comment-item"]')) {
      return;
    }
    // 头像链接没有文本，保持原有的跳转行为
    const linkText = ($link.textContent || "").trim();
    if (!linkText) {
      return;
    }
    const secUid = this.getSecUidFromHref($link.getAttribute("href") || "");
    if (!secUid) {
      return;
    }
    preventEvent(event);
    this.openMenu(event as MouseEvent, $link, secUid);
  },
  /**
   * 从 `/user/xxx` 链接里取出 sec_uid
   */
  getSecUidFromHref(href: string) {
    const match = href.match(/\/user\/([^/?#]+)/);
    return match ? match[1] : "";
  },
  /**
   * 从评论项的 React 数据里取用户 id
   *
   * 抖音 web 评论的 user 对象用 uid 字段，不同版本也可能用 id，这里都兜住。
   * 但沿 fiber 链往上找会路过视频作者、当前登录用户等不相干的对象，
   * 所以只认 `sec_uid` 与用户名链接里那个一致的 user；
   * 对不上时宁可只拿 sec_uid 去拉黑，也不冒险用别人的 uid
   */
  getCommentUserId($comment: HTMLElement, secUid: string) {
    if (!secUid) {
      return "";
    }
    let fiber: any = utils.getReactInstance($comment)?.reactFiber;
    for (let depth = 0; depth < 25 && fiber; depth++) {
      const props = fiber.memoizedProps;
      if (props) {
        const userList = [props.user, props.comment?.user, props.data?.user, props.item?.user];
        for (let index = 0; index < userList.length; index++) {
          const user = userList[index];
          if (!user || typeof user !== "object") {
            continue;
          }
          if (String(user.sec_uid || user.secUid || "") !== secUid) {
            continue;
          }
          const uid = String(user.uid || user.id || user.id_str || "");
          if (uid) {
            return uid;
          }
        }
      }
      fiber = fiber.return;
    }
    return "";
  },
  /**
   * 弹出菜单
   */
  openMenu(event: MouseEvent, $link: HTMLAnchorElement, secUid: string) {
    this.closeMenu();
    const $comment = $link.closest<HTMLElement>('[data-e2e="comment-item"]');
    this.$currentUser = {
      uid: $comment ? this.getCommentUserId($comment, secUid) : "",
      secUid,
      $link,
    };

    const $menu = document.createElement("ul");
    $menu.id = MENU_ID;
    $menu.className = "semi-dropdown-menu";
    $menu.setAttribute("role", "menu");
    $menu.setAttribute(SCRIPT_NODE_ATTR, "1");
    $menu.appendChild(this.buildMenuItem(HOME_ICON, "进主页", () => this.gotoUserHome()));
    const $blockItem = this.buildMenuItem(BLOCK_ICON, "屏蔽 TA", () => void this.blockCurrentUser());
    $blockItem.setAttribute(BLOCK_ITEM_ATTR, "1");
    $menu.appendChild($blockItem);
    document.body.appendChild($menu);

    // 贴着鼠标位置弹出，超出视口时往回收
    const margin = 8;
    const rect = $menu.getBoundingClientRect();
    let left = event.clientX;
    let top = event.clientY;
    if (left + rect.width + margin > window.innerWidth) {
      left = window.innerWidth - rect.width - margin;
    }
    if (top + rect.height + margin > window.innerHeight) {
      top = window.innerHeight - rect.height - margin;
    }
    $menu.style.left = Math.max(margin, left) + "px";
    $menu.style.top = Math.max(margin, top) + "px";
  },
  /**
   * 构造菜单项
   */
  buildMenuItem(icon: string, label: string, onClick: () => void) {
    const $item = document.createElement("li");
    $item.className = "semi-dropdown-item";
    $item.setAttribute("role", "menuitem");
    $item.setAttribute("tabindex", "0");
    $item.innerHTML = /*html*/ `<div class="semi-dropdown-item-icon">${icon}</div><span>${label}</span>`;
    $item.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      onClick();
    });
    return $item;
  },
  /**
   * 关闭菜单
   */
  closeMenu() {
    this.$currentUser = null;
    const $menu = document.getElementById(MENU_ID);
    if ($menu) {
      $menu.remove();
    }
  },
  /**
   * 进入该用户的个人主页
   *
   * 优先模拟点击原链接，让抖音自己走前端路由（不整页刷新）；
   * 抖音没接管时再兜底整页跳转
   */
  gotoUserHome() {
    const $link = this.$currentUser?.$link;
    this.closeMenu();
    if (!$link) {
      return;
    }
    const href = $link.href;
    const beforeUrl = window.location.href;
    this.$passClickLink = $link;
    try {
      $link.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true }));
    } catch (error) {
      // 模拟点击失败，走下面的兜底跳转
    }
    this.$passClickLink = null;
    setTimeout(() => {
      if (window.location.href === beforeUrl && href) {
        window.location.href = href;
      }
    }, 400);
  },
  /**
   * 拉黑该用户
   */
  async blockCurrentUser() {
    const current = this.$currentUser;
    this.closeMenu();
    if (!current) {
      return;
    }
    const isConfirmed = await confirm("确定要屏蔽该用户吗？");
    if (!isConfirmed) {
      return;
    }
    const result = await DouYinUserBlock.blockUser({
      userId: current.uid,
      secUserId: current.secUid,
    });
    if (result.success) {
      toast.success("已拉黑该用户", 4000);
    } else {
      toast.error(`拉黑失败：${result.message}`, 5000);
    }
  },
};
