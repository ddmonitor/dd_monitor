export default {
    test: /schedule\.hololive\.tv\/simple/,
    inject() {
        const promotion = document.querySelector<HTMLElement>(".navbar.promotion-header");
        if (promotion) {
            promotion.style.display = "none";
            console.log("DMH: 已移除hololive时间表宣传header");
        }
    }
}