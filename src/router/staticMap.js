import Layout from "@/views/layout";

export default [
  {
    path: "/member-query",
    component: Layout,
    onlyClick: true, //只能被点击使用,不能跳转
    children: [
      {
        path: "index",
        // component: () => import("@/views/member-query/index"),
        name: "query",
        meta: {
          title: "query",
          icon: "query",
          url: "query.png",
          group: "middle"
        }
      }
    ]
  },
  {
    sort: 8,
    path: "/product-return",
    component: Layout,
    onlyClick: true, //只能被点击使用,不能跳转
    children: [
      {
        path: "index",
        component: () => import("@/views/product-return/index"),
        name: "return",
        meta: {
          title: "return",
          icon: "return",
          url: "return.png",
          group: "middle"
        }
      }
    ]
  },
  {
    sort: 9,
    path: "/product-destroy",
    component: Layout,
    onlyClick: true, //只能被点击使用,不能跳转
    children: [
      {
        path: "index",
        component: () => import("@/views/product-destroy/index"),
        name: "destroy",
        meta: {
          title: "destroy",
          url: "destroy.png",
          icon: "destroy",
          group: "middle"
        }
      }
    ]
  }
];
