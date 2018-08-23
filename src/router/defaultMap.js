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
    path: "/mumber-query",
    component: () => import("@/views/member-query"),
    hidden: true //路由列表中，不显示
  },
  {
    path: "/home",
    component: () => import("@/views/home"),
    special: true, //特殊显示，首页显示模块，内容显示导航
    children: [
      {
        path: "index",
        name: "home",
        meta: {
          title: "home",
          icon: "home",
          url: "home.png",
          group: "top"
        }
      }
    ]
  }
];
