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
        path: 'home',
        component: () => import(/* webpackChunkName: "views" */ '@/views/Home.vue'),
        children: [
          {
            path: 't3_1',
            name: 'template3_1',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "views" */ '@/views/template/t3_1.vue')
          }
        ]
      }
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
