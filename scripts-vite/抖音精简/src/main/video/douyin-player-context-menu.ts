/**
 * 播放区域的右键菜单增强
 *
 * 刷视频时在播放区域点右键，抖音会弹出一个原生菜单（清屏 / 评论 / 赞 / 进入作者主页 …）。
 * 这里在这个菜单里追加一项「屏蔽 TA」，点击即可拉黑当前作品的作者（直播卡则是主播），
 * 不用再跳转到作者主页。
 *
 * 实现说明：
 * + 菜单是右键之后才动态渲染的，且类名都是构建生成的哈希值，不能作为定位依据，
 *   所以改为从菜单项的固定文案（如「进入作者主页」）反推菜单容器；
 * + 菜单渲染在播放器容器内部，从菜单的祖先节点就能拿到播放器，
 *   再从播放器的 React 数据里取作者（视频走 `awemeInfo.authorInfo`，直播走 fiber 链上的主播信息）。
 */
import { confirm } from "@/core/confirm";
import { DOMUtils } from "@/core/dom";
import { toast } from "@/core/toast";
import { utils } from "@/core/utils";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";
import { DouYinUserBlock } from "@/main/user/douyin-user-block";

/** 追加的菜单项文案 */
const BLOCK_LABEL = "屏蔽 TA";

/** 抖音红，用于让「屏蔽 TA」在原生菜单里更醒目 */
const DOUYIN_RED = "#fe2c55";

/**
 * 原生菜单里的固定文案，用于反推菜单容器，并按菜单形态给出最少项数
 *
 * `anchorTexts` 是**可替代的候选文案**，命中任意一个即可（抖音不同场景的菜单项不一样）
 */
const MENU_SHAPES: { anchorTexts: string[]; minItemCount: number }[] = [
  // 普通视频 / 已进入直播间：菜单项较多，带「进入作者主页」「进入直播间」
  { anchorTexts: ["进入作者主页", "进入直播间"], minItemCount: 3 },
  // 信息流里的直播预览卡（未进入直播间模式）：右键只有「不感兴趣」「举报」两项
  { anchorTexts: ["不感兴趣", "举报"], minItemCount: 2 },
];

/** 视频播放器容器，作品的 `awemeInfo` 就挂在它的 React 数据上 */
const BASE_PLAYER_SELECTOR = ".basePlayerContainer";

/**
 * 判断候选容器是不是下拉菜单（各菜单项纵向堆叠）
 *
 * 弹幕的右键菜单是一排横向的小按钮，里面同样有「举报」，只按文案判定会把它
 * 误当成播放器菜单。下拉菜单的各项在纵向上排开、横向上基本重合，据此区分：
 * 比较各项中心的纵向跨度与横向跨度，纵向更大才是下拉菜单。
 */
function isVerticalMenu($menu: HTMLElement) {
  const centerList = Array.from($menu.children)
    .filter(($row) => $row.getClientRects().length !== 0)
    .map(($row) => {
      const rect = $row.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    });
  if (centerList.length < 2) {
    return false;
  }
  const yList = centerList.map((item) => item.y);
  const xList = centerList.map((item) => item.x);
  const ySpread = Math.max(...yList) - Math.min(...yList);
  const xSpread = Math.max(...xList) - Math.min(...xList);
  return ySpread > xSpread;
}

/** 其余播放区域容器（直播卡 / 详情页），取不到上面那个时退化使用 */
const PLAYER_SELECTOR = [
  '[data-e2e="feed-video"]',
  '[data-e2e="feed-active-video"]',
  '[data-e2e="feed-live"]',
  ".douyin-player",
].join(",");

/** 原生菜单在右键之后渲染，重试次数与间隔（合计约 400ms） */
const MAX_INJECT_ATTEMPT = 6;
const INJECT_INTERVAL = 80;

/** 屏蔽目标 */
interface BlockTarget {
  /** 用户 id */
  uid: string;
  /** 用户 sec_uid */
  secUid: string;
  /** 昵称，仅用于提示文案 */
  nickname: string;
  /** 来源：视频作者 / 直播主播 */
  kind: "author" | "anchor";
}

/** 视频作品信息里用到的作者字段 */
interface DouYinVideoAwemeInfo {
  authorInfo?: {
    uid?: string | number;
    secUid?: string;
    nickname?: string;
  };
}

/** 反推出的原生菜单 */
interface PlayerMenu {
  /** 菜单容器 */
  $menu: HTMLElement;
  /** 菜单项，作为克隆样本 */
  $row: HTMLElement;
  /** 命中的锚点文案 */
  anchorText: string;
}

export const DouYinPlayerContextMenu = {
  /** 标记已注入的菜单项，避免重复注入 */
  itemAttribute: "data-dy-player-menu-block",
  /** 是否已初始化 */
  $inited: false,
  /** 当前右键的注入任务号，又右键一次时用来作废上一次未走完的重试链 */
  $injectToken: 0,
  init() {
    if (this.$inited) {
      return;
    }
    this.$inited = true;
    // 捕获阶段监听，右键发生在播放区域内才继续
    DOMUtils.on(document, "contextmenu", (event) => this.onContextMenu(event), { capture: true });
  },
  /**
   * 右键时判断是否在播放区域，并等待抖音把菜单渲染出来
   */
  onContextMenu(event: Event) {
    const $target = event.target;
    if (!($target instanceof Element)) {
      return;
    }
    const $player = $target.closest<HTMLElement>(BASE_PLAYER_SELECTOR) ?? $target.closest<HTMLElement>(PLAYER_SELECTOR);
    if (!$player) {
      return;
    }
    this.tryInject($player, 0, ++this.$injectToken);
  },
  /**
   * 尝试注入菜单项
   *
   * 原生菜单的渲染时机不确定，这一轮找不到就隔一小段时间再试；
   * 期间又右键了一次时旧的重试链直接作废，避免连点叠加无谓的扫描
   */
  tryInject($player: HTMLElement, attempt: number, token: number) {
    if (token !== this.$injectToken) {
      return;
    }
    if (this.injectMenuItem($player) || attempt >= MAX_INJECT_ATTEMPT) {
      return;
    }
    setTimeout(() => this.tryInject($player, attempt + 1, token), INJECT_INTERVAL);
  },
  /**
   * 查找原生菜单并追加「屏蔽 TA」
   * @returns 是否已处理（注入成功或菜单上已有该项）
   */
  injectMenuItem($player: HTMLElement) {
    const menu = this.findPlayerMenu($player);
    if (!menu) {
      return false;
    }
    // 取不到作者就不注入，避免误拉黑其他人
    const target = this.getTarget($player);
    if (!target) {
      return true;
    }
    // 菜单可能是被抖音复用而不是重新挂载的（`findPlayerMenu` 要排除隐藏的旧菜单，
    // 说明页面上确实会留着旧菜单），所以每次都要按当前播放器重算目标：
    // 目标没变就沿用已注入的那一项，变了就整个换掉，避免点到上一部作品的作者
    const targetKey = this.getTargetKey(target);
    const $exists = menu.$menu.querySelector<HTMLElement>("[" + this.itemAttribute + "]");
    if ($exists) {
      if ($exists.getAttribute(this.itemAttribute) === targetKey) {
        return true;
      }
      $exists.remove();
    }
    const $item = this.buildMenuItem(menu, target);
    if (!$item) {
      return false;
    }
    // 放在菜单最末尾（「进入详情页」之后），做一个醒目的兜底入口
    menu.$menu.appendChild($item);
    return true;
  },
  /**
   * 目标的唯一标识，用来判断菜单上已有的项是否还指向同一个用户
   */
  getTargetKey(target: BlockTarget) {
    return target.uid || target.secUid;
  },
  /**
   * 从播放器容器内反推抖音的原生菜单
   *
   * 页面上可能同时存在隐藏的旧菜单，这里要求菜单是可见的
   */
  findPlayerMenu($player: HTMLElement): PlayerMenu | null {
    const $elList = $player.querySelectorAll<HTMLElement>("div, li, a, span");
    for (let index = 0; index < $elList.length; index++) {
      const $el = $elList[index];
      // 菜单项文案是叶子节点
      if ($el.children.length !== 0) {
        continue;
      }
      const text = ($el.textContent || "").trim();
      const shape = MENU_SHAPES.find((item) => item.anchorTexts.indexOf(text) !== -1);
      if (!shape) {
        continue;
      }
      const $row = $el.parentElement;
      const $menu = $row?.parentElement;
      if (!$row || !$menu) {
        continue;
      }
      // 菜单由若干并列项组成，且当前必须可见
      if ($menu.children.length < shape.minItemCount || $menu.getClientRects().length === 0) {
        continue;
      }
      // 弹幕的右键菜单（横排的小工具条）里也有「举报」，只按文案判定会误判成
      // 播放器菜单，注入的「屏蔽 TA」就会指向视频作者，这里按排布方向排除掉
      if (!isVerticalMenu($menu)) {
        continue;
      }
      return { $menu, $row, anchorText: text };
    }
    return null;
  },
  /**
   * 克隆一个原生菜单项，把文案改成「屏蔽 TA」
   *
   * 克隆可以完整复用抖音自己的样式，避免类名变化导致外观走样
   */
  buildMenuItem(menu: PlayerMenu, target: BlockTarget) {
    const $item = menu.$row.cloneNode(true) as HTMLElement;
    // 去掉右侧的快捷键提示（如「（F）」）
    Array.from($item.querySelectorAll<HTMLElement>("*")).forEach(($child) => {
      if ($child.children.length !== 0) {
        return;
      }
      const text = ($child.textContent || "").trim();
      if ((text.startsWith("（") || text.startsWith("(")) && (text.endsWith("）") || text.endsWith(")"))) {
        $child.remove();
      }
    });
    // 把锚点文案换成「屏蔽 TA」
    let $label: HTMLElement | null = null;
    const $labelList = Array.from($item.querySelectorAll<HTMLElement>("*"));
    for (let index = 0; index < $labelList.length; index++) {
      if (($labelList[index].textContent || "").trim() === menu.anchorText) {
        $label = $labelList[index];
        break;
      }
    }
    if ($label) {
      $label.textContent = BLOCK_LABEL;
    } else if (($item.textContent || "").trim() === menu.anchorText) {
      $item.textContent = BLOCK_LABEL;
    } else {
      return null;
    }
    // 原生菜单项的文字是白色，这里把「屏蔽 TA」改成抖音红，让屏蔽入口更醒目
    $item.style.color = DOUYIN_RED;
    if ($label) {
      $label.style.color = DOUYIN_RED;
    }
    $item.setAttribute(this.itemAttribute, this.getTargetKey(target));
    $item.addEventListener(
      "click",
      () => {
        // 先收起抖音的原生菜单，再走屏蔽流程，避免菜单浮在确认框旁边
        this.closeNativeMenu();
        void this.blockTarget(target);
      },
      true
    );
    return $item;
  },
  /**
   * 收起抖音自己的原生菜单（点空白处即收起）
   *
   * 与聊天室那处「屏蔽 TA」保持一致；不用 stopPropagation，
   * 免得把抖音自身的「点空白关菜单」也一起挡掉
   */
  closeNativeMenu() {
    document.body.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
  },
  /**
   * 取本次要屏蔽的用户
   *
   * 视频：播放器的 `awemeInfo.authorInfo`；
   * 直播：沿 fiber 链找主播信息
   */
  getTarget($player: HTMLElement): BlockTarget | null {
    const fiber = utils.getReactInstance($player)?.reactFiber;
    if (!fiber) {
      return null;
    }
    const awemeInfo = utils.queryProperty<DouYinVideoAwemeInfo>(fiber, (node) => {
      const props = node?.memoizedProps;
      if (props && typeof props === "object" && props.awemeInfo && typeof props.awemeInfo === "object") {
        return { isFind: true, data: props.awemeInfo };
      }
      return { isFind: false, data: node?.return ?? null };
    });
    const author = awemeInfo?.authorInfo;
    if (author && (author.uid || author.secUid)) {
      return {
        uid: String(author.uid || ""),
        secUid: String(author.secUid || ""),
        nickname: String(author.nickname || ""),
        kind: "author",
      };
    }
    // 直播：主播信息挂在 fiber 链的 props 上
    let node: any = fiber;
    for (let depth = 0; depth < 40 && node; depth++) {
      const props = node.memoizedProps;
      if (props && typeof props === "object") {
        // 顺序有讲究：房间信息上的主播字段最可信；`userInfo` 在部分场景里是
        // 当前登录用户（信息流直播卡上出现过），只能放在最后兜底
        const userList = [
          props.roomInfo?.owner,
          props.roomInfo?.anchor,
          props.anchorInfo,
          props.roomInfo?.userInfo,
          props.userInfo,
        ];
        for (let index = 0; index < userList.length; index++) {
          const user = userList[index];
          if (!user || typeof user !== "object") {
            continue;
          }
          const uid = String(user.uid || user.id || user.id_str || "");
          const secUid = String(user.secUid || user.sec_uid || "");
          if (uid || secUid) {
            return { uid, secUid, nickname: String(user.nickname || user.nickName || ""), kind: "anchor" };
          }
        }
      }
      node = node.return;
    }
    return null;
  },
  /**
   * 执行屏蔽
   *
   * 拉黑代价高，先弹二次确认；
   * 直播场景与聊天室的「屏蔽 TA」保持一致：同时把主播加入聊天室屏蔽名单
   */
  async blockTarget(target: BlockTarget) {
    const isAnchor = target.kind === "anchor";
    const name = target.nickname ? `「${target.nickname}」` : "TA";
    const isConfirmed = await confirm(
      isAnchor ? `确定要屏蔽主播${name}吗？屏蔽后不再显示其发言，并同时拉黑对方。` : `确定要屏蔽视频作者${name}吗？`
    );
    if (!isConfirmed) {
      return;
    }
    if (isAnchor && target.uid) {
      DouYinLiveMessageFilter.addBlacklistUid(target.uid);
    }
    const result = await DouYinUserBlock.blockUser({ userId: target.uid, secUserId: target.secUid });
    if (result.success) {
      toast.success(isAnchor ? `已屏蔽主播${name}，并已拉黑` : `已拉黑视频作者${name}`, 4000);
    } else {
      toast.warning(
        isAnchor ? `已屏蔽主播${name}（拉黑失败：${result.message}）` : `拉黑${name}失败：${result.message}`,
        5000
      );
    }
  },
};
