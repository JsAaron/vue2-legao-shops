import defaultRouterMap from "@/router/defaultMap";
import asyncRouterMap from "@/router/asyncMap";

const permission = {
  state: {
    routers: defaultRouterMap, //总路由
    addRouters: [] //新增路由
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = defaultRouterMap.concat(routers);
    }
  },
  actions: {
    /**
     * 根据规则生成路由的访问控制列表
     * @param {*} param0
     * @param {*} data
     */
    ["GENERAT-ROUTES"]({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;
        //管理员权限，或者别的
        if (roles.indexOf("admin") >= 0) {
          accessedRouters = asyncRouterMap;
        } else {
          // accessedRouters = filterAsyncRouter(asyncRouterMap, roles)
        }
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
