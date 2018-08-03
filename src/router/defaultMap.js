/* Layout */
import Main from "@/views/main";

export default [
  {
    path: "/login",
    component: () => import("@/views/login"),
    hidden: true //路由列表中，不显示
  },
  {
    path: "",
    component: Main,
    redirect: "home",
    children: [
      {
        path: "home",
        component: () => import("@/views/home/index"),
        name: "home",
        meta: {
          title: "home",
          icon: "home",
          noCache: true
        }
      }
    ]
  }
];
