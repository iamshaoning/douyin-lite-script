/**
 * 直播聊天室消息过滤器
 *
 * 维护黑名单 uid、自定义正则规则与各类消息的屏蔽开关，
 * 对外提供「根据消息实例判断是否过滤」的判定逻辑。
 */
import { $$, DOMUtils } from "@/core/dom";
import { GM_getValue, GM_setValue, unsafeWindow } from "@/core/gm";
import { log } from "@/core/log";
import { utils } from "@/core/utils";
import { Panel } from "@/setting/panel";

/** 用户发言类消息（只有这类消息带 user 身份信息，才做黑名单|粉丝团|消费等级过滤） */
const USER_CHAT_METHODS = [
  "WebcastChatMessage",
  "WebcastEmojiChatMessage",
  "WebcastScreenChatMessage",
  "WebcastExhibitionChatMessage",
];

export const DouYinLiveMessageFilter = {
  key: "douyin-live-danmu-rule",
  /** 屏蔽用户uid的存储键 */
  key_blacklist_uid: "douyin-live-danmu-blacklist-uid",
  $data: {
    rule: [] as RegExp[],
    /** 【屏蔽】送礼信息 */
    block_gift: false,
    /** 【屏蔽】福袋口令 */
    block_lucky_bag: false,
    /** 【屏蔽】emoji|图片|表情包 */
    block_emoji: false,
    /** 【屏蔽】信息播报 */
    block_room_message: false,
    /** 仅显示当前主播粉丝团发言 */
    only_fans_club: false,
    /** 消费等级下限，0=不启用 */
    min_pay_grade: 0,
    /** 屏蔽用户uid（每行一个，# 开头为注释） */
    blacklist_uid: "",
    /** 屏蔽用户uid的编译缓存 */
    blacklist: [] as string[],
    /** 设置面板中的屏蔽uid输入框，用于「屏蔽 TA」时回填 */
    $blacklistTextarea: null as HTMLTextAreaElement | null,
    /** 设置面板中的屏蔽规则输入框，用于划词「屏蔽该词」时回填 */
    $ruleTextarea: null as HTMLTextAreaElement | null,
  },
  /** 是否已初始化，避免重复注册监听 */
  $inited: false,
  init() {
    // 规则与黑名单直接读存储，每次调用都重新同步，避免早期读取或其它标签页修改后不再更新
    this.initRule();
    this.initBlacklist();
    if (this.$inited) {
      return;
    }
    this.$inited = true;
    const optionList: {
      key: string;
      callback: (value: any) => void;
    }[] = [
      {
        key: "live-danmu-shield-gift",
        callback: (v: boolean) => (this.$data.block_gift = v),
      },
      {
        key: "live-danmu-shield-lucky-bag",
        callback: (v: boolean) => (this.$data.block_lucky_bag = v),
      },
      {
        key: "live-message-shield-method-emoji-chat",
        callback: (v: boolean) => (this.$data.block_emoji = v),
      },
      {
        key: "live-message-shield-room-message",
        callback: (v: boolean) => (this.$data.block_room_message = v),
      },
      {
        key: "live-danmu-shield-only-fans-club",
        callback: (v: boolean) => (this.$data.only_fans_club = v),
      },
      {
        key: "live-danmu-shield-min-pay-grade",
        callback: (v: number | string) => (this.$data.min_pay_grade = Number(v) || 0),
      },
    ];
    optionList.forEach((item) => {
      Panel.addValueChangeListener(
        item.key,
        (_, value) => {
          item.callback(value);
        },
        {
          immediate: true,
        }
      );
    });
  },
  /**
   * 初始化|重置解析规则
   */
  initRule() {
    this.$data.rule.length = 0;
    const localRule = this.get().trim();
    const localRuleSplit = localRule.split("\n");
    localRuleSplit.forEach((item: string) => {
      if (item.trim() == "") return;
      item = item.trim();
      let itemRegExp: RegExp;
      try {
        itemRegExp = new RegExp(item);
      } catch (error) {
        // 用户手写的正则可能不合法，跳过该条而不是让整个过滤器失效
        log.warn("忽略无法解析的屏蔽规则：", item, error);
        return;
      }
      this.$data.rule.push(itemRegExp);
    });
  },
  /**
   * 初始化屏蔽用户uid
   *
   * 只同步内存数据，不写回存储（存储写由 `setBlacklist` 负责）
   */
  initBlacklist() {
    const value = this.getBlacklist();
    this.$data.blacklist_uid = value;
    this.$data.blacklist = this.compileBlacklist(value);
    // 用户正在输入时不要拿存储值回填，否则面板里还没保存的编辑会被抹掉
    const $textarea = this.$data.$blacklistTextarea;
    if ($textarea?.isConnected && document.activeElement !== $textarea) {
      $textarea.value = value;
    }
  },
  /**
   * 编译屏蔽用户uid
   *
   * 支持换行、逗号、分号、空格分隔，# 开头的视为注释
   */
  compileBlacklist(rawBlacklist: string) {
    return String(rawBlacklist || "")
      .split(/[\s,;]+/)
      .map((item) => item.trim())
      .filter((item) => item && item.charAt(0) !== "#");
  },
  /**
   * 获取屏蔽用户uid（原始文本）
   */
  getBlacklist() {
    return GM_getValue(this.key_blacklist_uid, "");
  },
  /**
   * 设置屏蔽用户uid
   */
  setBlacklist(value: string) {
    this.$data.blacklist_uid = value;
    this.$data.blacklist = this.compileBlacklist(value);
    GM_setValue(this.key_blacklist_uid, value);
    if (this.$data.$blacklistTextarea?.isConnected) {
      this.$data.$blacklistTextarea.value = value;
    }
  },
  /**
   * 添加一个屏蔽用户uid
   * @returns
   * + true 添加成功
   * + false 已存在
   */
  addBlacklistUid(uid: string) {
    if (!uid) {
      return false;
    }
    // 内存态可能还没从存储初始化（如刚进直播间就点了屏蔽），
    // 先补一次读取，否则会用单条 uid 覆盖掉整份已保存的黑名单
    if (!this.$data.blacklist_uid) {
      this.initBlacklist();
    }
    if (this.$data.blacklist.includes(uid)) {
      return false;
    }
    const lines = String(this.$data.blacklist_uid || "")
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    lines.push(uid);
    this.setBlacklist(lines.join("\n"));
    return true;
  },
  /**
   * 添加一条屏蔽规则（按行去重）
   * @returns
   * + true 添加成功
   * + false 已存在或为空
   */
  addRule(text: string) {
    const ruleText = String(text || "").trim();
    if (!ruleText) {
      return false;
    }
    const lines = this.get()
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);
    if (lines.includes(ruleText)) {
      return false;
    }
    lines.push(ruleText);
    const next = lines.join("\n");
    this.set(next);
    this.initRule();
    if (this.$data.$ruleTextarea?.isConnected) {
      this.$data.$ruleTextarea.value = next;
    }
    return true;
  },
  /**
   * 是否是用户发言类消息
   */
  isUserChat(method?: string) {
    return typeof method === "string" && USER_CHAT_METHODS.includes(method);
  },
  /**
   * 获取当前直播间主播的uid
   */
  getCurrentAnchorId() {
    try {
      // @ts-expect-error
      const roomInfo = unsafeWindow["__STORE__"]?.roomStore?.roomInfo;
      const anchor = roomInfo?.anchor;
      if (!anchor) return "";
      return String(anchor.id_str || anchor.idStr || anchor.id || "");
    } catch (error) {
      return "";
    }
  },
  /**
   * 获取用户的uid
   *
   * 只用 uid 判定，不用 sec_uid|昵称（前者与uid不同源，后者可修改且不唯一）
   */
  getUserId(user: any) {
    if (!user) return "";
    return String(user.id || user.id_str || "");
  },
  /**
   * 是否属于当前主播的粉丝团
   */
  isCurrentAnchorFansClub(user: any) {
    const fansClubData = user?.fans_club?.data;
    const clubLevel = Number(fansClubData?.level || 0);
    if (!(clubLevel > 0)) return false;
    const clubAnchorId = String(fansClubData?.anchor_id || "");
    const anchorId = this.getCurrentAnchorId();
    if (anchorId) return clubAnchorId === anchorId;
    // 获取不到当前主播uid时，退化为「有归属主播」判断
    return clubAnchorId !== "" && clubAnchorId !== "0";
  },
  /**
   * 通知消息改变(可能是新增)
   */
  change() {
    this.execMessageFilterWithNode(
      Array.from($$<HTMLElement>("#chatroom .webcast-chatroom .webcast-chatroom___item:not([data-is-filter])"))
    );
  },
  /**
   * 获取聊天室条目元素上挂载的消息实例
   *
   * 抖音把消息实例放在 React 组件的 props 上，组件层级会随版本变化，
   * 因此先尝试已知的几条路径，未命中时再沿 fiber 的 `return` 链向上有限回溯。
   */
  getMessageInstance($danmu: HTMLElement) {
    /** 是否是消息实例（对象即可，后续由字段判定） */
    const isMessageInstance = (inst: any) => typeof inst === "object" && inst != null;
    const react = utils.getReactInstance($danmu);
    const knownMessageIns =
      react?.reactFiber?.return?.memoizedProps?.message ||
      react?.reactFiber?.memoizedProps?.children?.props?.children?.props?.message ||
      react?.reactContainer?.memoizedState?.element?.props?.message;
    if (isMessageInstance(knownMessageIns)) {
      return knownMessageIns;
    }
    // 已知路径均未命中，沿 fiber 向上回溯查找
    let fiber = react?.reactFiber;
    for (let depth = 0; depth < 20; depth++) {
      const messageIns = fiber?.memoizedProps?.message;
      if (isMessageInstance(messageIns)) {
        return messageIns;
      }
      fiber = fiber?.return;
      if (fiber == null) {
        break;
      }
    }
    return undefined;
  },
  /**
   * 执行过滤
   * @param messageQueue 消息元素队列
   */
  execMessageFilterWithNode(messageQueue: HTMLElement[]) {
    for (let index = 0; index < messageQueue.length; index++) {
      const $danmu = messageQueue[index];
      const messageIns = this.getMessageInstance($danmu);
      if (messageIns == null) {
        continue;
      }
      const flag = this.checkMessageFilter(messageIns);

      if (flag) {
        $danmu.setAttribute("data-is-filter", "true");
        if (import.meta.env.DEV) {
          const message = messageIns?.payload?.content || messageIns?.payload?.common?.describe;
          log.info("过滤信息: " + message);
        }
        DOMUtils.remove($danmu);
      }
    }
  },
  /**
   * 检测该消息是否应该被过滤
   * @returns
   * + true 过滤
   * + false 不过滤
   */
  checkMessageFilter(messageInst: any, method?: string) {
    const payload = messageInst?.payload;
    const message = payload?.content || payload?.common?.describe;

    /**
     * 消息类型
     *
     * + WebcastChatMessage 普通消息
     * + WebcastGiftMessage 礼物消息
     * + WebcastRoomMessage
     * + WebcastFansclubMessage
     * + WebcastEmojiChatMessage
     * + WebcastExhibitionChatMessage
     * + WebcastScreenChatMessage
     * + WebcastLikeMessage
     */
    method = method ?? messageInst?.method ?? payload?.common?.method;
    const chat_by: undefined | string = payload?.chat_by;
    const biz_scene: undefined | string = payload?.biz_scene;
    const public_area_common = payload?.public_area_common || {};
    let flag = false;

    // 以下三项仅对「用户发言类消息」生效（只有这类消息带 user 身份信息）
    const user = payload?.user;
    if (this.isUserChat(method)) {
      // 屏蔽用户uid
      if (this.$data.blacklist.length !== 0) {
        const uid = this.getUserId(user);
        if (uid && this.$data.blacklist.includes(uid)) {
          flag = true;
        }
      }
      // 仅显示当前主播粉丝团发言
      if (!flag && this.$data.only_fans_club && !this.isCurrentAnchorFansClub(user)) {
        flag = true;
      }
      // 消费等级下限
      if (!flag && this.$data.min_pay_grade > 0) {
        const payLevel = Number(user?.pay_grade?.level || 0);
        if (!(payLevel >= this.$data.min_pay_grade)) {
          flag = true;
        }
      }
    }

    if (!flag) {
      if (method === "WebcastGiftMessage") {
        // 礼物信息
        if (this.$data.block_gift) {
          flag = true;
        }
      } else if (method === "WebcastChatMessage") {
        // 普通信息
        if (
          chat_by === "9" ||
          chat_by === "10" ||
          Object.keys(public_area_common?.individual_strategy_result || {}).length !== 0
        ) {
          // 来自福袋一键发送
          // 福袋口令
          if (this.$data.block_lucky_bag) {
            flag = true;
          }
        } else if (chat_by === "0" || chat_by === "5" || chat_by === "11") {
          // 已知类型：0 未知来源、5 主播@别人、11 超管发言，均无需处理
        } else {
          if (import.meta.env.DEV) {
            log.info("未知信息实例chat_by：" + chat_by, messageInst);
          }
        }
      } else if (method === "WebcastRoomMessage") {
        // 聊天室的信息（黄颜色的）
        // 例如：欢迎来到直播间！抖音严禁未成年人直播或礼物消费。严禁违法违规、低俗色情、吸烟酗酒、人身伤害等直播内容。理性消费，如主播在直播中以不当方式诱导消费，请谨慎辨别。切勿私下交易，以防人身财产损失，谨防网络诈骗。
        // 是否是置顶信息
        if (this.$data.block_room_message) {
          flag = true;
        }
        if (biz_scene === "live_recommend" || payload?.system_top_msg) {
          // xxx推荐了直播（黄色的信息播报）/ 系统置顶消息，均为已知类型，无需处理
        }
      } else if (method === "WebcastEmojiChatMessage") {
        // 表情包|图片|emoji
        if (this.$data.block_emoji) {
          flag = true;
        }
      }
      // 其余已知类型无需处理：WebcastFansclubMessage 粉丝团、
      // WebcastExhibitionChatMessage 展览、WebcastScreenChatMessage 上屏、
      // WebcastLikeMessage 点赞、WebcastRoomStatsMessage 房间状态
    }
    if (!flag) {
      // 自定义消息过滤器
      flag =
        typeof message === "string" &&
        this.$data.rule.some((ruleText) => {
          if (message.match(ruleText)) {
            if (import.meta.env.DEV) {
              log.info("自定义规则成功过滤消息: " + message);
            }
            return true;
          }
        });
    }

    return flag;
  },
  set(value: string) {
    GM_setValue(this.key, value);
  },
  get() {
    return GM_getValue(this.key, "");
  },
};
