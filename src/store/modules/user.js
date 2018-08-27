import { loginByUsername, getUserInfo, logout } from "@/api/login";
import { getToken, saveToken, removeToken } from "@/utils/cookie";

const user = {
  state: {
    shopId: "", //登录ID
    shopName: "", //商店名
    loginData: "", //用户登录数据
    token: getToken(), //第二次加载，可能已经存在
    roles: "" //权限
  },

  mutations: {
    SET_SHOPID: (state, id) => {
      state.shopId = id;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_LOGINDATA(state, token) {
      state.userData = token;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_NAME(state, name) {
      state.shopName = name;
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction;
    }
  },

  actions: {
    /**
     * 第一次登陆
     * 记录用户信息
     */
    ["RECORD_USERINFO"]({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const data = response.data;
            const token = data.data.id + "-" + data.token;
            commit("SET_TOKEN", token);
            saveToken(token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * 如果cookies存在
     * 再次登陆
     * 获取用户信息
     */
    ["GET_USERINFO"]({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(response => {
            const data = response.data;
            commit("SET_LOGINDATA", data);
            commit("SET_NAME", data.shopname);
            commit("SET_SHOPID", data.shopid);
            commit("SET_ROLES", "admin");
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * 退出登录
     */
    ["LOGOUT"]({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            removeToken();
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
