import Main from "@/views/main";

/**
 * 异步路由
 */
export default [
  {
    path: "/shop",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/shop/index"),
        name: "shop",
        meta: {
          title: "shop",
          icon: "shop"
        }
      }
    ]
  },
  {
    path: "/inventory",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/inventory/index"),
        name: "inventory",
        meta: {
          title: "inventory",
          icon: "inventory"
        }
      }
    ]
  },
  {
    path: "/member",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/member/index"),
        name: "member",
        meta: {
          title: "member",
          icon: "member"
        }
      }
    ]
  },
  {
    path: "/order",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/order/index"),
        name: "order",
        meta: {
          title: "order",
          icon: "order"
        }
      }
    ]
  },
  {
    path: "/sell",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/sell/index"),
        name: "sell",
        meta: {
          title: "sell",
          icon: "sell"
        }
      }
    ]
  },
  {
    path: "/asset",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/asset/index"),
        name: "asset",
        meta: {
          title: "asset",
          icon: "asset"
        }
      }
    ]
  },
  {
    path: "/statistics",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/statistics/index"),
        name: "statistics",
        meta: {
          title: "statistics",
          icon: "statistics"
        }
      }
    ]
  },
  {
    path: "/query",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/query/index"),
        name: "query",
        meta: {
          title: "query",
          icon: "query"
        }
      }
    ]
  },
  {
    path: "/scanCode",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/scanCode/index"),
        name: "scanCode",
        meta: {
          title: "scanCode",
          icon: "scanCode"
        }
      }
    ]
  },
  {
    path: "/scanDestroy",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/scanDestroy/index"),
        name: "scanDestroy",
        meta: {
          title: "scanDestroy",
          icon: "scanDestroy"
        }
      }
    ]
  }
];
