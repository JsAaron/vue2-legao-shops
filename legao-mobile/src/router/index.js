import Vue from "vue";
import VueRouter from "vue-router";
import { routerMode } from "@/config";
import App from "../App";

const home = r => require.ensure([], () => r(require("../views/home")), "home");

const details = r =>
  require.ensure([], () => r(require("../views/details")), "details");

const notice = r =>
  require.ensure([], () => r(require("../views/notice")), "notice");

const routes = [
  {
    path: "/",
    component: App, //顶层路由，对应index.html
    children: [
      //二级路由。对应App.vue
      //地址为空时跳转home页面
      {
        path: "",
        redirect: "/home"
      },
      {
        path: "/home",
        component: home
      },
      {
        path: "/details",
        component: details
      },
      {
        path: "/notice",
        component: notice
      }
    ]
  }
];

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== "production",
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 };
    // if (savedPosition) {
    //   return savedPosition;
    // } else {
    //   if (from.meta.keepAlive) {
    //     from.meta.savedPosition = document.body.scrollTop;
    //   }
    //   return { x: 0, y: to.meta.savedPosition || 0 };
    // }
  }
});

export default router;
