import defaultRouterMap from "@/router/defaultMap";
import asyncRouterMap from "@/router/asyncMap";

const permission = {
  state: {
    homeRouters: [...defaultRouterMap.concat(asyncRouterMap)], //全部路由，首页使用
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
    ["GENERAT_ROUTES"]({ commit }, data) {
      return new Promise(resolve => {
        const roles = data.roles;
        let accessedRouters = [];
        for (let i = 0; i < asyncRouterMap.length; i++) {
          if (~roles.indexOf(asyncRouterMap[i].path + "/index")) {
            accessedRouters.push(asyncRouterMap[i]);
          }
        }
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
