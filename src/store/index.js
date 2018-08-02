import Vue from "vue";
import Vuex from "vuex";

import user from "./modules/user";
import app from "./modules/app";
import permission from "./modules/permission";
import getters from "./getters";
import tagsView from "./modules/tagsView";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission
  },
  getters
});
