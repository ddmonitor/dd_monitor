import "array-proto-ext";
import { Dictionary } from 'array-proto-ext';

const ctx: {
    injects: {
        test: RegExp;
        inject: () => void;
    }[],
    parentWindow: Window,
    name: string;
} = {
    injects: []
} as any;

function init() {
    const injects = require.context("./injects", false, /[A-Za-z0-9-_]+\.ts$/);
    ctx.injects = injects
        .keys()
        .map(key => injects(key).default);
    console.log("DMH: init");

    let url = window.location.href;
    for (const i of ctx.injects) {
        if (i.test.test(url)) {
            window.addEventListener("load", i.inject);
            register();
            break;
        }
    }
}

function register() {
    // 在iframe里面，而不是单独页面
    if (unsafeWindow.parent !== unsafeWindow) {
        if (!unsafeWindow.$name) {
            ctx.name = _.uniqueId("subWindow_");
            unsafeWindow.$name = ctx.name;
            ctx.parentWindow = unsafeWindow.parent;
            console.log(`DMH: iframe '${ctx.name}'(${unsafeWindow.document.title}) registered`);

            ctx.parentWindow.postMessage({
                type: "M_SCRIPT_INIT",
                source: ctx.name
            }, "*");
            console.debug(ctx.parentWindow);
        }


    }
}

init();
