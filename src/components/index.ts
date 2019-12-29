import Vue, { VueConstructor, ComponentOptions } from "vue";

/** 自动注册文件夹里的组件到全局 */
function registerComponents() {
    const components = require.context("./global", true, /[a-zA-Z0-9-_]+\.(?:vue|tsx)$/);
    components.keys().forEach(key => {
        const component = components(key)["default"];
        // 检查是否导出了组件构造函数
        const _constructor = component as VueConstructor & {
            options: ComponentOptions<Vue>;
            cid: number;
        };
        let name = _constructor.options ? _constructor.options.name : "";
        // 检查是否导出了组件选项
        if (!name) {
            const option = component as ComponentOptions<Vue>;
            name = option.name;
        }
        // 检查文件名作为组件名
        if (!name) {
            const match = /([a-zA-Z0-9-_]+)\.(?:vue|tsx)$/.exec(key);
            name = match ? match[1] : "";
        }
        console.log("Auto register component: " + name);
        Vue.component(name, component);
    });
}

registerComponents();