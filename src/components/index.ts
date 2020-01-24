import Vue, { VueConstructor, ComponentOptions } from "vue";
import { __importDefault } from "tslib";
import { getOptions } from '@/util/vue';
/** 自动注册文件夹里的组件到全局 */
function registerComponents() {
    const components = require.context("./global", true, /[a-zA-Z0-9-_]+\.(?:vue|tsx)$/);
    components.keys().forEach(key => {
        const component = __importDefault(components(key))["default"];
        const option = getOptions(component);
        let name = option.name;
        // 检查文件名作为组件名
        if (!name || name === "t") {
            const match = /([a-zA-Z0-9-_]+)\.(?:vue|tsx)$/.exec(key);
            name = match ? match[1] : "";
        }
        console.log("Auto register component: " + name);
        Vue.component(name, component);
    });
}

registerComponents();