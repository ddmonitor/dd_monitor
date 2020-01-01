// ==UserScript==
// @name         DD Monitor Helper
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  DD Monitor Helper
// @author       LoveKicher
// @match        *://schedule.hololive.tv/simple
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function() {
    function init() {
        console.log("DMH: init");
        let url = window.location.href;
        let $h: ((e: Event) => void) | null = null;
        if (url.includes("schedule.hololive.tv/simple")) {
            $h = pHololiveSchedule;
        }
        window.addEventListener("load", $h || (e => { }));
    }


    function pHololiveSchedule(e: Event) {
        const promotion = document.querySelector<HTMLElement>(".navbar.promotion-header");
        if (promotion) {
            promotion.style.display = "none";
            console.log("DMH: 已移除hololive时间表宣传header");
        }
    }

    init();
})();