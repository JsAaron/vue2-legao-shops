import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import app from "./modules/app";
import permission from "./modules/permission";
import tagsView from "./modules/tagsView";
import member from "./modules/member";

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
    tagsView,
    permission
  },
  getters
});

export default store;
