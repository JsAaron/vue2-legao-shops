import App from '../App'

// const login = r => require.ensure([], () => r(require('../page/login')), 'login')
const home = r => require.ensure([], () => r(require('../page/home')), 'home')
const search = r => require.ensure([], () => r(require('../page/search')), 'search')
const order = r => require.ensure([], () => r(require('../page/order')), 'order')
const profile = r => require.ensure([], () => r(require('../page/profile')), 'profile')

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    //地址为空时跳转home页面
    {
      path: '',
      redirect: '/home'
    },
    //首页城市列表页
    {
      path: '/home',
      component: home
    },
    //搜索页
    {
      path: '/search/:geohash',
      component: search
    },
    //个人信息页
    {
      path: '/profile',
      component: profile
    },
    //订单列表页
    {
      path: '/order',
      component: order
    }
  ]
}]
