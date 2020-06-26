import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/pages/Layout.vue';
import statics from "./static";

Vue.use(VueRouter)

let routes: { [url: string]: RouteConfig } = {};
const wrapperRoute: RouteConfig = {
  path: '/',
  component: Layout,
  children: []
};
function registerStatic() {
  routes = statics
    .reduce<{ [url: string]: RouteConfig }>((s, v) => {
      s[v.path] = v;
      return s;
    }, {});
  routes["/"] = wrapperRoute;
}



const router = new VueRouter({
  routes: [wrapperRoute, ...statics],
});

router.onError(err => {
  router.replace({
    name: "404",
  });
});

router.beforeEach((to, from, next) => {
  const url = to.path;
  if (Object.keys(routes).length == 0) {
    registerStatic();
  }
  console.log(to)
  if (!routes[url]) {
    const match = /^\/(?:.+\/)?([A-Za-z0-9-_]+)\/?$/.exec(url);
    const name = match ? match[1] : url;
    const route: RouteConfig = {
      path: url,
      name,
      // route level code-splitting
      // this generates a separate chunk (views.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "dviews" */ `@/views/dynamic${url}.vue`)
    };
    routes[url] = route;
    // 注册路由
    wrapperRoute.children!.push(route);
    router.addRoutes([wrapperRoute]);
    // 终止当前路由，并采用新注册的路由进行跳转
    next({ path: url });
  } else {
    next();
  }
  
});

export default router;
