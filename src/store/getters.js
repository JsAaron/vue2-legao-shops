const getters = {
  //登录用户状态
  shopId: state => state.user.shopId,
  name: state => state.user.name,
  cookie: state => state.user.cookie,
  roles: state => state.user.roles,
  loginData: state => state.user.loginData,

  //左边导航
  sidebar: state => state.app.sidebar,

  //会员管理
  queryVisible: state => state.member.queryVisible,
  manageVisible: state => state.member.manageVisible,

  //动态路由
  addRouters: state => state.permission.addRouters,

  // 获取许可的路由规则
  permission_routers: state => state.permission.routers //左边路由
};
export default getters;
