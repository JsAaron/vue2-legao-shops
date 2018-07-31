import defaultRouterMap from '@/router/defaultMap'
import asyncRouterMap from '@/router/asyncMap'

const interceptor = {
  state: {
    // routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers
      state.routers = asyncRouterMap.concat(routers)
    }
  },
  actions: {
    /**
     * 根据规则生成路由的访问控制列表
     * @param {*} param0 
     * @param {*} data 
     */
    ['GENERAT-ROUTES']({
      commit
    }, data) {
      return new Promise(resolve => {
        const {
          roles
        } = data
        let accessedRouters
          //管理员权限，或者别的
        if (roles.indexOf('admin') >= 0) {
          accessedRouters = defaultRouterMap
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit('SET_ROUTERS', accessedRouters)
        resolve()
      })
    }
  }
}

export default interceptor