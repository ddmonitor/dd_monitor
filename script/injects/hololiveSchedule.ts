import { ctx } from '../index';
const moduleName = "holo schedule";
export default {
    test: /schedule\.hololive\.tv\/simple/,
    inject() {
        const promotion = document.querySelector<HTMLElement>(".navbar.promotion-header");
        if (promotion) {
            promotion.style.display = "none";
            console.log("DMH: 已移除宣传header");
        }
        if (ctx.parentWindow) {
            const videoLinks = document.querySelectorAll<HTMLAnchorElement>(".tab-pane a");
            videoLinks.forEach(a => {
                if (a.target === "_blank") {
                    a.onclick = () => {
                        console.log("DMH: 已拦截油管链接跳转");
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