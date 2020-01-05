import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from "@/pages/Layout.vue";

Vue.use(VueRouter)

const routes: RouteConfig[] = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        name: 'index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "views" */ '@/views/Home.vue')
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
