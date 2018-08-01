const getters = {
  sidebar: state => state.app.sidebar, //左边导航
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  token: state => state.user.token, //cookise
  roles: state => state.user.roles,
  addRouters: state => state.permission.addRouters, //动态路由
  permission_routers: state => state.permission.routers //左边路由
};
export default getters;
