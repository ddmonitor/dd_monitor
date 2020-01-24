/** 模板类型 */
export type TemplateMode =
    /** 标准模板，组件面板在页面内，以iframe的形式包含页面 */
    "standard" |
    /** 窗口模板，以新窗口的形式打开每个组件页面并在整个桌面布局 */
    "window" |
    /** 移动端模板，类似标准模板，不过采用流式布局，强调纵向可滚动性 */
    "mobile" | 
    "default";
