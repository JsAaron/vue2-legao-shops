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
          title: "商铺管理",
          icon: "shop"
        }
      }
    ]
  },
  {
    path: "/repertory",
    component: Main,
    children: [
      {
        path: "index",
        component: () => import("@/views/repertory/index"),
        name: "repertory",
        meta: {
          title: "库存管理",
          icon: "repertory"
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
          title: "会员管理",
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
          title: "订单管理",
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
          title: "会员卡销售",
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
          title: "资产管理",
          icon: "asset"
        }
      }
    ]
  }
];
