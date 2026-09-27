/**
 * 设置面板-直播-聊天室消息过滤器
 *
 * 既作为「设置-直播」下的深层菜单内容，也供直播聊天室的快捷入口直接展示
 */
import { DOMUtils } from "@/core/dom";
import { utils } from "@/core/utils";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";
import { UIInputNumber } from "@/setting/ui-input-number";
import { UIOwn } from "@/setting/ui-own";
import { UISwitch } from "@/setting/ui-switch";
import type { PanelViewConfig } from "@/setting/types";

export const PanelLiveMessageFilterViews: PanelViewConfig[] = [
  {
    type: "container",
    text: "",
    views: [
      UISwitch("启用", "live-danmu-shield-rule-enable"),
      UISwitch("【屏蔽】送礼信息", "live-danmu-shield-gift"),
      UISwitch("【屏蔽】福袋口令", "live-danmu-shield-lucky-bag"),
      UISwitch("【屏蔽】emoji|图片|表情包", "live-message-shield-method-emoji-chat"),
      UISwitch(
        "【屏蔽】信息播报",
        "live-message-shield-room-message",
        false,
        void 0,
        "如：xxx 为主播加了 xx分、恭喜xxx等"
      ),
      UISwitch(
        "仅显示当前主播粉丝团发言",
        "live-danmu-shield-only-fans-club",
        false,
        void 0,
        "只保留当前主播粉丝团成员的发言，其余全部过滤"
      ),
      UIInputNumber(
        "消费等级下限",
        "live-danmu-shield-min-pay-grade",
        0,
        "消费等级低于该值的用户发言将被过滤，0 = 不启用"
      ),
    ],
  },
  {
    type: "container",
    text: "",
    views: [
      UIOwn(($li: HTMLLIElement) => {
        // 默认的<li>是「左文字 + 右组件」的横向布局，这里改成纵向：标题/描述在上，输入框在下
        $li.style.display = "flex";
        $li.style.flexDirection = "column";
        $li.style.alignItems = "stretch";
        $li.style.gap = "8px";
        const $desc = DOMUtils.createElement("div", {
          className: "dyl-panel-item-text",
          innerHTML: `<p class="dyl-panel-item-text-main">屏蔽用户uid</p><p class="dyl-panel-item-text-desc">直播聊天室中可通过右键菜单「屏蔽 TA」快速添加</p>`,
        });
        const $textareaWrapper = DOMUtils.createElement("div", {
          className: "dyl-panel-textarea",
        });
        const textarea = DOMUtils.createElement(
          "textarea",
          {},
          {
            placeholder: "请输入需要屏蔽的用户uid，每行一个\n例如：\n123456789\n987654321",
            style: "height:200px;",
          }
        );
        $textareaWrapper.append(textarea);
        textarea.value = DouYinLiveMessageFilter.getBlacklist();
        // 提供给「屏蔽 TA」回填使用
        DouYinLiveMessageFilter.$data.$blacklistTextarea = textarea;
        DOMUtils.on(
          textarea,
          ["input", "propertychange"],
          utils.debounce(function () {
            DouYinLiveMessageFilter.setBlacklist(textarea.value);
          }, 1000)
        );
        $li.appendChild($desc);
        $li.appendChild($textareaWrapper);
        return $li;
      }),
    ],
  },
  {
    type: "container",
    text: "",
    views: [
      UIOwn(($li: HTMLLIElement) => {
        const $textareaWrapper = DOMUtils.createElement("div", {
          className: "dyl-panel-textarea",
        });
        const textarea = DOMUtils.createElement(
          "textarea",
          {},
          {
            placeholder: "请输入屏蔽规则，每行一个\n例如：屏蔽包含'主播'的消息\n主播",
            style: "height:350px;",
          }
        );
        $textareaWrapper.append(textarea);
        textarea.value = DouYinLiveMessageFilter.get();
        // 提供给聊天区划词「屏蔽该词」回填使用
        DouYinLiveMessageFilter.$data.$ruleTextarea = textarea;
        DOMUtils.on(
          textarea,
          ["input", "propertychange"],
          utils.debounce(function () {
            DouYinLiveMessageFilter.set(textarea.value);
            DouYinLiveMessageFilter.initRule();
          }, 1000)
        );
        $li.appendChild($textareaWrapper);
        return $li;
      }),
    ],
  },
];
