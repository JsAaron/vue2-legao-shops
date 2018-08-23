import Frame from "@/views/frame";

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
    sort: 1,
    path: "/inventory",
    component: Frame,
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
    sort: 2,
    path: "/order",
    component: Frame,
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
    sort: 3,
    path: "/member",
    component: Frame,
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

  // 会员卡销售
  {
    sort: 4,
    path: "/member-sell",
    component: Frame,
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

  //资产管理
  {
    sort: 5,
    path: "/asset",
    component: Frame,
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

  //10 数据统计
  {
    sort: 6,
    path: "/statistics",
    component: Frame,
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

  //店铺管理
  {
    sort: 7,
    path: "/shop",
    component: Frame,
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

  //5 会员卡查询
  {
    path: "/member-query",
    component: Frame,
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

  //6.产品扫码
  {
    sort: 8,
    path: "/scanCode",
    component: Frame,
    onlyClick: true, //只能被点击使用,不能跳转
    children: [
      {
        path: "index",
        component: () => import("@/views/scanCode/index"),
        name: "scanCode",
        meta: {
          title: "scanCode",
          icon: "scanCode",
          url: "scanCode.png",
          group: "middle"
        }
      }
    ]
  },

  //7订单扫码销核
  {
    sort: 9,
    path: "/scanDestroy",
    component: Frame,
    onlyClick: true, //只能被点击使用,不能跳转
    children: [
      {
        path: "index",
        component: () => import("@/views/scanDestroy/index"),
        name: "scanDestroy",
        meta: {
          title: "scanDestroy",
          url: "scanDestroy.png",
          icon: "scanDestroy",
          group: "middle"
        }
      }
    ]
  }
];
