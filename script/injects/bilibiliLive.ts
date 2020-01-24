export default {
    test: /live\.bilibili\.com\/\d+/,
    inject() {
        Object.defineProperty(document, "domain", {
            value: "live.bilibili.com"
        });
    }
}