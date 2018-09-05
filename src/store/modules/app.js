const app = {
  state: {
    scrollFn: null //app滚动元素
  },
  mutations: {
    //切换列表缩放
    ["TOGGLE_SIDEBAR"](state) {
      if (state.sidebar.opened) {
        Cookies.set("sidebarStatus", 1);
      } else {
        Cookies.set("sidebarStatus", 0);
      }
      state.sidebar.opened = !state.sidebar.opened;
      state.sidebar.withoutAnimation = false;
    },
    ["SET_SCROLL_FN"](state, fn) {
      state.scrollFn = fn;
    },
    ["DEL_SCROLL_FN"](state) {
      state.scrollFn = null;
    },
    ["SET_APP_SCROLL"](state) {
      if (state.scrollFn) {
        state.scrollFn();
      }
    }
  },
  actions: {
    /**
     * 通过点击目录缩放目录列表
     */
    ["TOGGLE_SIDEBAR"]({ commit }) {
      commit("TOGGLE_SIDEBAR");
    },
    /**
     * 保存滚动方法
     * @param {}} param0
     */
    ["SAVE_SCROLL_FN"]({ commit }, fn) {
      commit("SET_SCROLL_FN", fn);
    },
    /**
     * 销毁滚动方法
     * @param {*} param0
     */
    ["DEL_SCROLL_FN"]({ commit }) {
      commit("DEL_SCROLL_FN");
    },
    /**
     * 更新app滚动条
     * @param {*} param0
     */
    ["UPDATE_APP_SCROLL"]({ commit }) {
      commit("SET_APP_SCROLL");
    }
  }
};

export default app;
