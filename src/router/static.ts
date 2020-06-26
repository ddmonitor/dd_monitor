import { RouteConfig } from 'vue-router';
import Layout from '@/pages/Layout.vue';
export default [
    {
        path: "/404",
        name: "404",
        component: () => import(/* webpackChunkName: "pages" */ `@/pages/404.vue`)
    },
] as RouteConfig[];