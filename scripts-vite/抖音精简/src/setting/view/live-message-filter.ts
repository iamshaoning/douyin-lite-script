/**
 * 设置面板-直播-聊天室消息过滤器
 *
 * 既作为「设置-直播」下的深层菜单内容，也供直播聊天室的快捷入口直接展示
 */
import { DOMUtils } from "@/core/dom";
import { toast } from "@/core/toast";
import { utils } from "@/core/utils";
import { DouYinLiveMessageFilter } from "@/main/live/douyin-live-message-filter";
import { Panel } from "@/setting/panel";
import { UIInputNumber } from "@/setting/ui-input-number";
import { UIOwn } from "@/setting/ui-own";
import { UISwitch } from "@/setting/ui-switch";
import type { PanelViewConfig } from "@/setting/types";

/** 诊断面板的自动刷新定时器，模块级持有，避免切换菜单后旧定时器残留 */
let diagnosticsTimer: ReturnType<typeof setInterval> | undefined;

export const PanelLiveMessageFilterViews: PanelViewConfig[] = [
  {
    type: "container",
    text: "",
    views: [UISwitch("显示聊天室浮动入口", "live-danmu-filter-entry-show", true)],
  },
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
  {
    type: "container",
    text: "漏网诊断",
    views: [
      UISwitch(
        "诊断模式",
        "live-danmu-debug",
        false,
        void 0,
        "开启后，下方实时解析聊天区当前显示的消息；关闭或离开本页即停止，不影响过滤"
      ),
      UIOwn(($li: HTMLLIElement) => {
        // 默认的<li>是「左文字 + 右组件」的横向布局，这里改成纵向：说明在上，解析结果与按钮在下
        $li.style.display = "flex";
        $li.style.flexDirection = "column";
        $li.style.alignItems = "stretch";
        $li.style.gap = "8px";
        $li.innerHTML = /* html */ `
          <div class="dyl-panel-item-text">
            <p class="dyl-panel-item-text-main">聊天区实时解析</p>
            <p class="dyl-panel-item-text-desc">只解析过滤后仍显示在聊天区的发言；面板打开期间自动跟随刷新，关闭或切走即停止</p>
          </div>
          <div class="dyl-panel-textarea">
            <textarea readonly style="height:360px;"></textarea>
          </div>
          <div style="display:flex;gap:8px;">
            <button type="button" class="dyl-panel-button" data-action="copy">复制</button>
          </div>
        `;
        const $textarea = $li.querySelector("textarea")!;
        const stop = () => {
          if (diagnosticsTimer != null) {
            clearInterval(diagnosticsTimer);
            diagnosticsTimer = undefined;
          }
        };
        const tick = () => {
          // 关闭面板或切换到其它菜单后 $li 会脱离文档，此时立即停止解析，不再占用性能
          if (!$li.isConnected) {
            stop();
            return;
          }
          if (!Panel.getValue("live-danmu-debug")) {
            if ($textarea.value !== "诊断模式未开启") {
              $textarea.value = "诊断模式未开启";
            }
            return;
          }
          const text = DouYinLiveMessageFilter.getDisplayedMessagesText();
          // 内容没变就不重写；变化时保留滚动位置，避免刷新把正在看的位置顶回顶部
          if ($textarea.value !== text) {
            const scrollTop = $textarea.scrollTop;
            $textarea.value = text;
            $textarea.scrollTop = scrollTop;
          }
        };
        // 切换菜单会重建内容区，先清掉上一个面板留下的定时器
        stop();
        tick();
        diagnosticsTimer = setInterval(tick, 500);
        $li.querySelector('[data-action="copy"]')?.addEventListener("click", async () => {
          const isOk = await utils.copy($textarea.value);
          if (isOk) {
            toast.success("解析结果已复制", 2000);
          } else {
            toast.error("复制失败，请手动选中文本复制", 3000);
          }
        });
        return $li;
      }),
    ],
  },
];
