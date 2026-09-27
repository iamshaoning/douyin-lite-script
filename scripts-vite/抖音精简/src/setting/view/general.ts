/**
 * 设置面板-通用
 *
 * 包含路由改变监听、新标签页打开搜索，以及左侧导航栏/顶部导航栏的布局屏蔽
 */
import { toast } from "@/core/toast";
import { DouYinFeatureCheck } from "@/main/douyin-feature-check";
import { UIOwn } from "@/setting/ui-own";
import { UISwitch } from "@/setting/ui-switch";
import type { PanelContentConfig } from "@/setting/types";

export const PanelGeneralConfig: PanelContentConfig = {
  id: "panel-general-config",
  title: "通用",
  views: [
    {
      type: "container",
      text: "",
      views: [
        UISwitch(
          "【屏蔽】广告、下载客户端提示",
          "dy-remove-ads",
          true,
          void 0,
          "屏蔽下载客户端提示、<code>so.douyin.com</code> 的广告等，并写入 <code>JXEntranceNegative</code> Cookie 隐藏抖音精选入口"
        ),
        UISwitch("监听Router改变", "dy-common-listenRouterChange", true, void 0, "当地址栏改变时，功能重载，建议开启"),
        UISwitch(
          "首页停留在推荐页",
          "dy-common-recommend-home",
          true,
          void 0,
          "抖音会把首页 <code>/</code> 重定向到<code>抖音精选</code>（<code>/jingxuan</code>），开启后首页直接停留在推荐页"
        ),
        UISwitch(
          "新标签页打开搜索结果",
          "dy-search-click-to-new-tab",
          false,
          void 0,
          "点击搜索框的<code>搜索</code>按钮时，点击视频区域的<code>#话题</code>时，新标签页打开"
        ),
      ],
    },
    {
      text: "",
      type: "container",
      views: [
        {
          text: "布局屏蔽-左侧导航栏",
          type: "deepMenu",
          views: [
            {
              type: "container",
              text: "",
              views: [UISwitch("【屏蔽】左侧导航栏", "shieldLeftNavigator")],
            },
            {
              type: "container",
              text: "",
              views: [
                UISwitch("【屏蔽】精选", "shieldLeftNavigator-tab-home"),
                UISwitch("【屏蔽】推荐", "shieldLeftNavigator-tab-recommend"),
                UISwitch("【屏蔽】AI搜索/抖音", "shieldLeftNavigator-tab-ai-search"),
              ],
            },
            {
              type: "container",
              text: "",
              views: [
                UISwitch("【屏蔽】关注", "shieldLeftNavigator-tab-follow"),
                UISwitch("【屏蔽】朋友", "shieldLeftNavigator-tab-friend"),
                UISwitch("【屏蔽】我的", "shieldLeftNavigator-tab-user_self"),
              ],
            },
            {
              type: "container",
              text: "",
              views: [
                UISwitch(
                  "【屏蔽】activity",
                  "shieldLeftNavigator-tab-activity",
                  false,
                  void 0,
                  "在<code>直播</code>上面出现的按钮"
                ),
                UISwitch("【屏蔽】直播", "shieldLeftNavigator-tab-live"),
                UISwitch("【屏蔽】放映厅", "shieldLeftNavigator-tab-vs"),
                UISwitch("【屏蔽】短剧", "shieldLeftNavigator-tab-series"),
                UISwitch("【屏蔽】小游戏", "shieldLeftNavigator-tab-microgame"),
              ],
            },
            {
              type: "container",
              text: "",
              views: [
                UISwitch("【屏蔽】设置", "shieldLeftNavigator-panel-menu-setting"),
                UISwitch("【屏蔽】关于", "shieldLeftNavigator-panel-menu-about"),
                UISwitch("【屏蔽】问题/反馈", "shieldLeftNavigator-panel-menu-q_a"),
                UISwitch("【屏蔽】用户体验调研", "shieldLeftNavigator-panel-menu-survey"),
              ],
            },
          ],
        },
        {
          text: "布局屏蔽-顶部导航栏",
          type: "deepMenu",
          views: [
            {
              type: "container",
              text: "",
              views: [UISwitch("【屏蔽】顶部右侧的菜单栏", "shield-topNav-rightMenu")],
            },
            {
              type: "container",
              text: "",
              views: [
                UISwitch("【屏蔽】AI搜索", "shield-topNav-ai-search"),
                UISwitch("【屏蔽】客户端提示", "shieldClientTip", true),
                UISwitch("【屏蔽】充钻石", "shieldFillingBricksAndStones", true),
                UISwitch("【屏蔽】客户端", "shieldClient", true),
                UISwitch("【屏蔽】快捷访问", "shieldQuickAccess"),
                UISwitch("【屏蔽】通知", "shieldNotifitation"),
                UISwitch("【屏蔽】消息", "shieldPrivateMessage"),
                UISwitch("【屏蔽】投稿", "shieldSubmission"),
                UISwitch("【屏蔽】壁纸", "shieldWallpaper"),
                UISwitch("【屏蔽】更多", "shield-topNav-rightMenu-more"),
                UISwitch("【屏蔽】登录头像", "shield-topNav-rightMenu-loginAvatar"),
              ],
            },
          ],
        },
      ],
    },
    {
      type: "container",
      text: "通知测试",
      views: [
        UIOwn(($li: HTMLLIElement) => {
          $li.innerHTML = /* html */ `
            <div class="dyl-panel-item-text">
              <p class="dyl-panel-item-text-main">弹出各类通知</p>
              <p class="dyl-panel-item-text-desc">点击后同时弹出 信息 / 成功 / 警告 / 错误 四种通知，用于目视检查尺寸与配色</p>
            </div>
            <button type="button" class="dyl-panel-button">弹出通知</button>
          `;
          $li.querySelector("button")?.addEventListener("click", () => {
            toast.info("检测1：出现【长时间无操作，已暂停播放】弹窗，正在尝试自动关闭", 4000);
            toast.success("已屏蔽 uid 1234567890", 4000);
            toast.warning("当前直播没有【蓝光】画质，自动选择【高清】", 4000);
            toast.error("未找到视频容器", 4000);
          });
          return $li;
        }),
      ],
    },
    {
      type: "container",
      text: "功能自检",
      views: [
        UISwitch(
          "页面加载后自动自检",
          "dy-common-feature-check",
          true,
          void 0,
          "页面加载完成后检查当前页面已加载的功能是否真正生效，未生效时通知并尝试重新生效"
        ),
        UIOwn(($li: HTMLLIElement) => {
          $li.innerHTML = /* html */ `
            <div class="dyl-panel-item-text">
              <p class="dyl-panel-item-text-main">立即检查</p>
              <p class="dyl-panel-item-text-desc">检查当前页面已加载的功能是否生效，未生效时尝试重新生效</p>
            </div>
            <button type="button" class="dyl-panel-button">开始检查</button>
          `;
          $li.querySelector("button")?.addEventListener("click", () => {
            DouYinFeatureCheck.runNow();
          });
          return $li;
        }),
      ],
    },
  ],
};
