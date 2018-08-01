import Layout from "@/views/layout";

/**
 * 异步路由
 */
export default [
  {
    path: "/tab",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/tab/index"),
        name: "tab",
        meta: {
          title: "tab",
          icon: "tab"
        }
      }
    ]
  }
];
