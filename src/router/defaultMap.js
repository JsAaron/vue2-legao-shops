export default [
  {
    path: "/",
    component: () => import("@/views/home"),
    hidden: true //路由列表中，不显示
  },
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true //路由列表中，不显示
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    hidden: true //路由列表中，不显示
  }
];
