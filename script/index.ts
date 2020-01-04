
const ctx: {
    injects: {
        test: RegExp;
        inject: () => void;
    }[]
} = {
    injects: []
};

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
            break;
        }
    }
}


init();
