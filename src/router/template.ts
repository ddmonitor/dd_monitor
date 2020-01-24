import { RouteConfig } from 'vue-router';
import Vue, { VueConstructor, ComponentOptions } from "vue";
import { __importDefault } from "tslib";
import { component } from 'vue/types/umd';
import { getOptions, TemplateMeta } from '@/util/vue';

function registerRoutes(): RouteConfig[] {
    const routes: RouteConfig[] = [];
    const views = require.context("@/views/template", true, /[A-Za-z0-9-_]+\.(?:vue|tsx)$/);
    views.keys().forEach(key => {
        const view = __importDefault(views(key))["default"];
        const options = getOptions(view);
        let meta: TemplateMeta | undefined;

        if (options.computed && options.computed["__META__"]) {
            try {
                meta = (options.computed["__META__"] as Function)();
            } catch (error) {
                console.warn(`Parse metadata of template '${key}' failed: `, error);
                return;
            }
        } 
        if (!meta) {
            console.warn(`Cannot find metadat of template '${key}'!`);
            return;
        }
        console.log(meta)
        routes.push({
            path: meta.path,
            name: meta.name,
            component: view,
            meta
        });

    });
    return routes;
}

export default registerRoutes();
