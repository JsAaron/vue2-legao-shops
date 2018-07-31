const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  addRouters: state => state.interceptor.addRouters,
}
export default getters