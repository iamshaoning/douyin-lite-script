/**
 * 设置面板的样式（抖音配色：深色底 + 品牌红）
 */
export const PANEL_CSS = `
.dyl-panel-mask {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.55);
  font-family: -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
}
.dyl-panel {
  display: flex;
  flex-direction: column;
  width: 880px;
  height: 620px;
  max-width: 92vw;
  max-height: 88vh;
  overflow: hidden;
  color: #e8e8ea;
  background: #1f1f26;
  border: 1px solid #2f2f3a;
  border-radius: 12px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.6);
}
.dyl-panel-header {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 0 12px 0 16px;
  border-bottom: 1px solid #2f2f3a;
}
.dyl-panel-header-title {
  font-size: 16px;
  font-weight: 600;
  color: #e8e8ea;
}
.dyl-panel-header-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 16px;
  line-height: 1;
  color: #8a8a99;
  cursor: pointer;
  border-radius: 6px;
  user-select: none;
}
.dyl-panel-header-close:hover {
  color: #ffffff;
  background: #2a2a34;
}
.dyl-panel-body {
  display: flex;
  flex: 1;
  overflow: hidden;
}
.dyl-panel-menu {
  flex-shrink: 0;
  width: 168px;
  padding: 8px;
  overflow-y: auto;
  border-right: 1px solid #2f2f3a;
}
.dyl-panel-menu-item {
  display: flex;
  align-items: center;
  height: 36px;
  margin-bottom: 4px;
  padding: 0 12px;
  font-size: 14px;
  color: #b5b5c0;
  cursor: pointer;
  border-radius: 8px;
  user-select: none;
}
.dyl-panel-menu-item:hover {
  color: #e8e8ea;
  background: #2a2a34;
}
.dyl-panel-menu-item--active {
  font-weight: 600;
  color: #fe2c55;
  background: rgba(254, 44, 85, 0.15);
}
.dyl-panel-content {
  flex: 1;
  padding: 12px 16px;
  overflow-y: auto;
}
.dyl-panel-container {
  margin-bottom: 12px;
  padding: 4px 12px;
  background: #26262f;
  border-radius: 10px;
}
.dyl-panel-container-title {
  padding: 8px 0;
  font-size: 13px;
  color: #8a8a99;
}
.dyl-panel-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
.dyl-panel-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  min-height: 48px;
  padding: 10px 0;
  border-bottom: 1px solid #2f2f3a;
}
.dyl-panel-item:last-child {
  border-bottom: none;
}
.dyl-panel-item-text {
  flex: 1;
  min-width: 0;
}
.dyl-panel-item-text-main {
  margin: 0;
  font-size: 14px;
  line-height: 20px;
  color: #e8e8ea;
  word-break: break-all;
}
.dyl-panel-item-text-desc {
  margin: 2px 0 0;
  font-size: 12px;
  line-height: 18px;
  color: #8a8a99;
  word-break: break-all;
}
.dyl-panel-item-text-desc code {
  padding: 0 4px;
  color: #fe2c55;
  background: #3a3a44;
  border-radius: 4px;
}
.dyl-switch {
  position: relative;
  flex-shrink: 0;
  width: 40px;
  height: 22px;
  cursor: pointer;
  background: #4a4a55;
  border-radius: 11px;
  transition: background 0.2s;
}
.dyl-switch::after {
  position: absolute;
  top: 2px;
  left: 2px;
  width: 18px;
  height: 18px;
  content: "";
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s;
}
.dyl-switch--on {
  background: #fe2c55;
}
.dyl-switch--on::after {
  transform: translateX(18px);
}
.dyl-switch--disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
.dyl-panel-select {
  flex-shrink: 0;
  min-width: 110px;
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  color: #e8e8ea;
  cursor: pointer;
  background: #2a2a34;
  border: 1px solid #3a3a44;
  border-radius: 6px;
  outline: none;
}
.dyl-panel-select:focus {
  border-color: #fe2c55;
}
.dyl-panel-input {
  flex-shrink: 0;
  width: 90px;
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  color: #e8e8ea;
  background: #2a2a34;
  border: 1px solid #3a3a44;
  border-radius: 6px;
  outline: none;
}
.dyl-panel-input:focus {
  border-color: #fe2c55;
}
.dyl-panel-button {
  flex-shrink: 0;
  height: 32px;
  padding: 0 14px;
  font-size: 13px;
  color: #ffffff;
  cursor: pointer;
  background: #fe2c55;
  border: none;
  border-radius: 6px;
  outline: none;
}
.dyl-panel-button:hover {
  background: #ff4d6d;
}
.dyl-panel-button:active {
  background: #e02149;
}
.dyl-panel-textarea {
  width: 100%;
}
.dyl-panel-textarea textarea {
  box-sizing: border-box;
  width: 100%;
  padding: 8px;
  font-family: Consolas, Monaco, monospace;
  font-size: 13px;
  line-height: 1.6;
  color: #e8e8ea;
  resize: vertical;
  background: #2a2a34;
  border: 1px solid #3a3a44;
  border-radius: 8px;
  outline: none;
}
.dyl-panel-textarea textarea:focus {
  border-color: #fe2c55;
}
.dyl-panel-deep-menu {
  cursor: pointer;
}
.dyl-panel-deep-menu-arrow {
  flex-shrink: 0;
  font-size: 14px;
  color: #8a8a99;
}
.dyl-panel-deep-menu:hover .dyl-panel-deep-menu-arrow {
  color: #fe2c55;
}
.dyl-panel-back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 8px;
  font-size: 13px;
  color: #8a8a99;
  cursor: pointer;
  user-select: none;
}
.dyl-panel-back:hover {
  color: #fe2c55;
}
.dyl-panel-footer {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-end;
  height: 32px;
  padding: 0 16px;
  font-size: 12px;
  color: #5f5f6b;
  border-top: 1px solid #2f2f3a;
}
.dyl-panel-content::-webkit-scrollbar,
.dyl-panel-menu::-webkit-scrollbar {
  width: 6px;
}
.dyl-panel-content::-webkit-scrollbar-thumb,
.dyl-panel-menu::-webkit-scrollbar-thumb {
  background: #3a3a44;
  border-radius: 3px;
}
`;
