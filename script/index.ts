import _ from "lodash";

export type InjectMode = "subwindow" | "top" | "all";
export const ctx: {
    injects: {
        test: RegExp;
        mode: InjectMode
        inject: () => void;
    }[],
    parentWindow: Window,
    name: string;
} = {
    injects: []
} as any;

export function $log(msg: string) {
    console.log("%cDHM%c " + msg, 'background:#49c8f0;border-radius:5px;padding:5px;', '')
}

function init() {
    const injects = require.context("./injects", false, /[A-Za-z0-9-_]+\.ts$/);
    ctx.injects = injects
        .keys()
        .map(key => injects(key).default);
    $log("init");

    let url = window.location.href;
    for (const i of ctx.injects) {
        if (i.test.test(url)) {
            window.addEventListener("load", i.inject);
            register(i.mode);
            break;
        }
    }
}

function register(mode: InjectMode) {
    if (mode === "subwindow" || mode === "all") {
        // 在iframe里面，而不是单独页面
        if (unsafeWindow.parent !== unsafeWindow) {
            if (!unsafeWindow.$name) {
                ctx.name = _.uniqueId("subWindow_");
                unsafeWindow.$name = ctx.name;
                ctx.parentWindow = unsafeWindow.parent;
                $log(`iframe '${ctx.name}'(${unsafeWindow.document.title}) registered`);
                unsafeWindow.$GM_XHR = GM_xmlhttpRequest;
                ctx.parentWindow.postMessage({
                    type: "M_SCRIPT_INIT",
                    source: ctx.name
                }, "*");
                console.debug(ctx.parentWindow);
            }
            return;
        }
    }
    if (mode === "top" || mode === "all") {
        if (!unsafeWindow.$name) {
            ctx.name = _.uniqueId("top_");
            unsafeWindow.$name = ctx.name;
            ctx.parentWindow = unsafeWindow;
            $log(`top '${ctx.name}'(${unsafeWindow.document.title}) registered`);
            unsafeWindow.$GM_XHR = GM_xmlhttpRequest;
            ctx.parentWindow.postMessage({
                type: "M_SCRIPT_INIT",
                source: ctx.name
            }, "*");
        }
    }

    
    
}

init();
