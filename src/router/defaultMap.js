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
    redirect: "dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index"),
        name: "dashboard",
        meta: {
          title: "dashboard",
          icon: "dashboard",
          noCache: true
        }
      }
    ]
  }
];
