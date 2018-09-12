const app = {
  state: {
    scrollHandle: null //app滚动元素
  },
  mutations: {
    ["SET_SCROLL_HANDLE"](state, fn) {
      state.scrollHandle = fn;
    },
    ["CLEAR_SCROLL_HANDLE"](state) {
      state.scrollHandle = null;
    },
    ["SET_APP_SCROLL"](state) {
      if (state.scrollHandle) {
        state.scrollHandle();
      }
    }
  },
  actions: {
    /**
     * 保存滚动方法
     * @param {}} param0
     */
    ["SaveScrollHandle"]({ commit }, fn) {
      commit("SET_SCROLL_HANDLE", fn);
    },
    /**
     * 销毁滚动方法
     * @param {*} param0
     */
    ["clearScrollHandle"]({ commit }) {
      commit("CLEAR_SCROLL_HANDLE");
    },
    /**
     * 更新app滚动条
     * @param {*} param0
     */
    ["UpdateAppScroll"]({ commit }) {
      commit("SET_APP_SCROLL");
    }
  }
};

export default app;
