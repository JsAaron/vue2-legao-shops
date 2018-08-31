import { loginByUsername, getUserInfo, logout } from "@/api/login";
import { getCookie, saveCookie, removeCookie } from "@/utils/cookie";

const setDefaultCookise = function() {
  const cookie = getCookie();
  if (cookie) {
    const data = JSON.parse(cookie);
    return { userid: data.userid, token: data.token };
  }
  return "";
};

const exit = function(commit) {
  commit("SET_TOKEN", "");
  commit("SET_ROLES", []);
  removeCookie();
};

const user = {
  state: {
    realname: "", //用户名
    userId: "", //用户ID
    shopId: "", //登录ID
    shopName: "", //商店名
    loginData: "", //用户登录数据
    cookie: setDefaultCookise(), //第二次加载，可能已经存在
    roles: "" //权限
  },

  mutations: {
    SET_USERID: (state, userid) => {
      state.userId = userid;
    },
    SET_SHOPID: (state, id) => {
      state.shopId = id;
    },
    SET_USERNAME: (state, realname) => {
      state.userName = realname;
    },
    SET_SHOPNAME(state, name) {
      state.shopName = name;
    },
    SET_TOKEN(state, cookie) {
      state.cookie = cookie;
    },
    SET_LOGINDATA(state, token) {
      state.userData = token;
    },
    SET_ROLES(state, roles) {
      state.roles = roles;
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
            const userid = data.data.id;
            const token = data.token;
            commit("SET_TOKEN", { userid, token });
            saveCookie(JSON.stringify({ userid, token }));
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
            if (response.data.state == "error") {
              console.log(response);
              exit(commit);
              console.log(response.data.msg);
              resolve();
              return;
            }
            const data = response.data.data;
            // console.log(data);
            commit("SET_USERID", data.id);
            commit("SET_USERNAME", data.realname);
            commit("SET_LOGINDATA", data);
            commit("SET_SHOPNAME", data.shopname);
            commit("SET_SHOPID", data.shopid);
            commit("SET_ROLES", data.roles);
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
            exit(commit);
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
