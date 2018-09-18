const getters = {
  //登录用户状态
  shopId: state => state.user.shopId,
  shopName: state => state.user.shopName,
  name: state => state.user.name,
  cookie: state => state.user.cookie,
  roles: state => state.user.roles,
  loginData: state => state.user.loginData,
  userName: state => state.user.userName,
  userId: state => state.user.userId,

  //动态路由
  addRouters: state => state.permission.addRouters,
  permissionRouters: state => state.permission.routers, //导航，主路由
  staticRouters: state => state.permission.staticRouters, //导航，静态路由
  homeRouters: state => state.permission.homeRouters, //主页路由

  // 弹出菜单
  popupMenuVisible: state => state.head.popupMenuVisible
};
export default getters;
