import { ctx, $log } from '../index';
const moduleName = "holo schedule";
export default {
    test: /schedule\.hololive\.tv\/simple/,
    mode: "subwindow",
    inject() {
        const promotion = document.querySelector<HTMLElement>(".navbar.promotion-header");
        if (promotion) {
            promotion.style.display = "none";
            $log("已移除宣传header");
        }
        if (ctx.parentWindow) {
            const videoLinks = document.querySelectorAll<HTMLAnchorElement>(".tab-pane a");
            videoLinks.forEach(a => {
                if (a.target === "_blank") {
                    a.onclick = () => {
                        $log("已拦截油管链接跳转");
                        ctx.parentWindow.postMessage({
                            type: "M_OPEN_U_LINK",
                            source: ctx.name,
                            data: {
                                url: a.href,
                                name: (a.textContent || "").replace(/(?:\n|[ ]{2,})/g, ""),
                                module: moduleName
                            }
                        }, "*");
                        return false;
                    };
                }
            });
        }
    }
}