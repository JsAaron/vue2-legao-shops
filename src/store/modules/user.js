import { loginByUsername, getUserInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";

const user = {
  state: {
    //第二次加载，可能已经存在
    token: getToken(),
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
     * 记录用户信息
     */
    ["RECORD_USERINFO"]({ commit }, userInfo) {
      const username = userInfo.username.trim();
      return new Promise((resolve, reject) => {
        loginByUsername(username, userInfo.password)
          .then(response => {
            const data = response.data;
            commit("SET_TOKEN", data.token);
            setToken(response.data.token);
            resolve();
          })
          .catch(error => {
            reject(error);
          });
      });
    },

    /**
     * 获取用户信息
     */
    ["GET_USERINFO"]({ commit, state }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.token)
          .then(response => {
            if (!response.data) {
              // 由于mockjs 不支持自定义状态码只能这样hack
              reject("error");
            }
            const data = response.data;
            if (data.roles && data.roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit("SET_ROLES", data.roles);
            } else {
              reject("getInfo: roles must be a non-null array !");
            }
            commit("SET_NAME", data.name);
            commit("SET_AVATAR", data.avatar);
            commit("SET_INTRODUCTION", data.introduction);
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};

export default user;
