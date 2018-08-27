const getters = {
  //user状态
  shopId: state => state.user.shopId,
  name: state => state.user.name,
  cookie: state => state.user.cookie, //cookie
  roles: state => state.user.roles,
  loginData: state => state.user.loginData, //用户登录数据

  sidebar: state => state.app.sidebar, //左边导航

  addRouters: state => state.permission.addRouters, //动态路由
  // 获取许可的路由规则
  permission_routers: state => state.permission.routers //左边路由
};
export default getters;
