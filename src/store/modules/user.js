import { loginByUsername, getUserInfo, logout } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    //第二次加载，可能已经存在
    token: getToken(), //cookies
    roles: [],
    name: "",
    avatar: "",
    introduction: ""
  },

  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
    },
    SET_NAME(state, name) {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
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
            setToken(token);
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
            // const data = response.data;
            // if (data.roles && data.roles.length > 0) {
            //   // 验证返回的roles是否是一个非空数组
            commit("SET_ROLES", "admin");
            // } else {
            //   reject("getInfo: roles must be a non-null array !");
            // }
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
