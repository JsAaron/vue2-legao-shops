import { loginByUsername } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

export const RECORD_USERINFO = 'RECORD_USERINFO'

const user = {
  state: {
    user: ''
  },

  mutations: {

  },

  actions: {
    /**
     * 记录用户信息
     */
    [RECORD_USERINFO]({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password).then(response => {
          // const data = response.data
          // commit('SET_TOKEN', data.token)
          // setToken(response.data.token)
          // resolve()
        }).catch(error => {
          // reject(error)
        })
      })
    }
  }


}

export default user