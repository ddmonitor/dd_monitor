import { RouteConfig } from 'vue-router';

export default [
    {
        path: "/404",
        name: "404",
        component: () => import(/* webpackChunkName: "pages" */ `@/pages/404.vue`)
    }
] as RouteConfig[];