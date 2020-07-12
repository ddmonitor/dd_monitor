# dd_monitor

![Node CI](https://github.com/ddmonitor/dd_monitor/workflows/Node%20CI/badge.svg)

DD大屏，开启专属于你的dd监控室。

PS: 当前主分支为dev分支，为bilibili专版。目前功能仍处于开发中。

## Features

### 常规用户功能
* 多窗口直播与视频查看
* 小窗口模式，快速开启监控大爷模式
* bilibili直播日程表
* VTuber搜索推荐
* Multi-language support

### DD开发人员功能
* 配置化的VTuber数据管理系统
* 基于元数据配置的表单与列表组件，多视图，可扩展，可定制
* 基于企业级数据管理开发，提供数据的增删改查，权限配置，变更追溯，历史查询，数据快照，导入导出
* 数据统计分析，可接入内部或外部数据源
* 前端采用webpack模块上下文进行自动注册，告别export地狱
* 前端对bilibili API的访问权限，无需后台抓取


## Project setup and development

### Setup

Note: The ServiceWorker doesn't work in development mode.
```bash
# Install yarn before setup
npm i -g yarn
yarn install
yarn serve
```
### Install userscript helper

DD大屏需要安装一个油猴脚本来与嵌入的窗口通信

1. Install [Tampermonkey](http://www.tampermonkey.net) or other userscript manager.
2. Build userscript
```bash
cd script
yarn install
yarn build #or 'yarn dev' to create a development version
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
