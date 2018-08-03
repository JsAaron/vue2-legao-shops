const getters = {
  sidebar: state => state.app.sidebar, //左边导航
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  token: state => state.user.token, //cookise
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters, //动态路由
  // 获取许可的路由规则
  permission_routers: state => state.permission.routers, //左边路由
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews
};
export default getters;
