import { $log } from '../index';

export default {
    test: /live\.bilibili\.com\/\d+/,
    mode: "all",
    inject() {
        Object.defineProperty(document, "domain", {
            value: "live.bilibili.com"
        });
        if (window.location.search.includes("from=ddmonitor")) {
            document.body.style.overflow = "hidden";
            document.body.classList.add("ddmonitor-inject");
  
            const css = document.createElement("style");
            css.innerText =
`.ddmonitor-inject .link-navbar-ctnr,
.ddmonitor-inject .head-info-section,
.ddmonitor-inject .gift-control-section,
.ddmonitor-inject .side-bar-cntr {
    display: none !important;
}
.ddmonitor-inject .player-section {
    position: fixed !important;
    height: 100%;
    width: 100%;
    left: 0;
    top: 0;
}`;
            document.body.appendChild(css);
            
        }
        $log("直播页面已自动网页全屏");
    }
}