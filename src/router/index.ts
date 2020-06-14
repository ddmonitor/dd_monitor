import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/pages/Layout.vue';
import templates from "./template";
Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: "home",
        // route level code-splitting
        // this generates a separate chunk (views.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "views" */ '@/views/Home.vue')
      },
      ...templates
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
