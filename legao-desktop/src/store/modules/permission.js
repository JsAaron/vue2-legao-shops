import defaultRouterMap from "@/router/defaultMap";
import mainRouterMap from "@/router/mainMap";
import staticRouterMap from "@/router/staticMap";

const permission = {
  state: {
    //全部路由，首页使用
    homeRouters: [
      ...defaultRouterMap.concat(mainRouterMap).concat(staticRouterMap)
    ],
    routers: defaultRouterMap, //总路由
    mainRouters: mainRouterMap, //主路由
    staticRouters: staticRouterMap, //静态路由
    addRouters: [] //新增路由
  },
  mutations: {
    ["SET_ROUTERS"]: (state, routers) => {
      state.addRouters = routers;
      state.routers = routers;
    }
  },
  actions: {
    /**
     * 根据规则生成路由的访问控制列表
     * @param {*} param0
     * @param {*} data
     */
    ["GenerateRoutes"]({ commit }, data) {
      return new Promise(resolve => {
        const roles = data.roles;
        let accessedRouters = [];
        for (let i = 0; i < mainRouterMap.length; i++) {
          if (~roles.indexOf(mainRouterMap[i].path + "/index")) {
            accessedRouters.push(mainRouterMap[i]);
          }
        }
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
