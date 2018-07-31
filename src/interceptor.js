import {
  getToken
} from '@/utils/auth' // getToken from cookie
import store from './store'

/**
 * 配置路由全局守卫
 * @param {配置} router
 */
export default function(router) {
  router.beforeEach((to, from, next) => {
    //js-cookies
    if (getToken()) {
      //有token
      if (to.path === '/login') {
        console.log(1)
        next({
          path: '/'
        })
      } else {
        //判断当前用户是否已拉取完user_info信息
        //用户已经登录，所以不需要跳入登录页面，直接进管理页面
        if (store.getters.roles.length === 0) {
          store.dispatch('GET_USERINFO').then(res => {
            const roles = res.data.roles
            console.log(roles)
          })
        }
      }
    } else {
      console.log(3)
        //如果目标是登录页面
        //跳过不处理
      if (~['/login', '/authredirect'].indexOf(to.path)) {
        next()
      } else {
        // 否则全部重定向到登录页
        next('/login')
      }
    }
  })
}