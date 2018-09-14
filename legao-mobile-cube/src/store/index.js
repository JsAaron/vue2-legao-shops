import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import app from "./modules/app";
import member from "./modules/member";
import limit from "./modules/limit";

import getters from "./getters";

Vue.use(Vuex);
//这里到处，注意循环引用
//store给new vue用
//gettters直接引用文件
const store = new Vuex.Store({
  modules: {
    app,
    user,
    member,
    limit
  },
  getters
});

export default store;
