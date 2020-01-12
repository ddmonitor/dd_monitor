# dd_monitor

DD大屏，开启专属于你的dd监控室

## Features

* 多窗口直播与视频查看，支持Youtube, bilibili, niconico
* 支持页面内监控室模式与页面外小窗口模式
* 直播日程表、推特动态导航，点击链接直接在页面内查看
* 丰富的页面模板，可定制布局
* 针对VTuber优化的一键dd功能，快速选老婆看动态
* Multi-language support
* PWA support，可以以应用方式打开网站

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
3. Add a new script, copy the content of `script/dist/index.js` and save.



### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
