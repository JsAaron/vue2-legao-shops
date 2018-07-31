import App from "../App";

/* Layout */
import Layout from '@/views/layout'
import Login from '@/views/login'
import Err401 from '@/views/common/401.vue'
import Err404 from '@/views/common/404.vue'
import Manage from '@/views/manage'

export default [{
    path: "/login",
    name: "登录",
    component: Login
  },
  {
    path: "/401",
    name: "无权访问",
    component: Err401
  },
  {
    path: "/404",
    name: "找不到页面",
    component: Err404
  },
  {
    path: '',
    component: Layout,
    redirect: 'manage',
    children: [{
      path: 'manage',
      component: Manage,
      name: 'manage',
      meta: {
        title: 'manage',
        icon: 'manage',
        noCache: true
      }
    }]
  },
];