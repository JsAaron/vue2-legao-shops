import { getToken } from '@/utils/auth' // getToken from cookie

/**
 * 配置路由全局守卫
 * @param {配置} router
 */
export default function(router) {
  router.beforeEach((to, from, next) => {
    //设置js-cookies
    if (getToken()) {

    } else {
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