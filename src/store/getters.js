const getters = {
  //登录用户状态
  shopId: state => state.user.shopId,
  shopName: state => state.user.shopName,
  name: state => state.user.name,
  cookie: state => state.user.cookie,
  roles: state => state.user.roles,
  loginData: state => state.user.loginData,
  userName: state => state.user.userName,

  //会员管理
  memberQueryVisible: state => state.member.queryVisible,
  memberManageVisible: state => state.member.manageVisible,

  //动态路由
  addRouters: state => state.permission.addRouters,

  // 获取许可的路由规则
  permission_routers: state => state.permission.routers //左边路由
};
export default getters;
