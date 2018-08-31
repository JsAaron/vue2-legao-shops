import Layout from "@/views/layout";

/**
 * 异步路由
 * 分组；
 *  库管 订单 会员 会员卡销售
 *  会员快速查询 产品扫码 订单核销
 *  店铺管理 资产管理 数据统计
 */
export default [
  //库存管理
  {
    path: "/inventory",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/inventory/index"),
        name: "inventory",
        meta: {
          title: "inventory",
          icon: "inventory",
          url: "inventory.png",
          group: "top"
        }
      }
    ]
  },

  // 订单管理
  {
    path: "/order",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/order/index"),
        name: "order",
        meta: {
          title: "order",
          icon: "order",
          url: "order.png",
          group: "top"
        }
      }
    ]
  },

  //3.会员管理
  {
    path: "/member",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/member/index"),
        name: "member",
        meta: {
          title: "member",
          icon: "member",
          url: "member.png",
          group: "top"
        }
      }
    ]
  },

  //资产管理
  {
    path: "/asset",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/asset/index"),
        name: "asset",
        meta: {
          title: "asset",
          url: "asset.png",
          icon: "asset",
          group: "bottom"
        }
      }
    ]
  },

  {
    sort: 7,
    path: "/shop",
    component: Layout,
    children: [
      {
        sort: 1,
        path: "index",
        component: () => import("@/views/shop/index"),
        name: "shop",
        meta: {
          title: "shop",
          url: "shop.png",
          icon: "shop",
          group: "bottom"
        }
      }
    ]
  },

  //10 数据统计
  {
    path: "/statistics",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/statistics/index"),
        name: "statistics",
        meta: {
          title: "statistics",
          icon: "statistics",
          url: "statistics.png",
          group: "bottom"
        }
      }
    ]
  },

  // 会员卡销售
  {
    path: "/member-sell",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/member-sell/index"),
        name: "sell",
        meta: {
          title: "sell",
          icon: "sell",
          url: "sell.png",
          group: "top"
        }
      }
    ]
  },

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
