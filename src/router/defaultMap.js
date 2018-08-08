/* Layout */
import Main from "@/views/main";

export default [
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
