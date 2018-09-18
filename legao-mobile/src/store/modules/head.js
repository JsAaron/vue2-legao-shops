/**
 * 头部公共部分状态
 */
const head = {
  state: {
    popupMenuVisible: false //弹出菜单栏状态
  },
  mutations: {
    ["SET_POPUP_MENU"](state, value) {
      state.popupMenuVisible = value;
    }
  },
  actions: {
    /**
     * 弹出菜单打开
     */
    ["PopupMenuOpen"]({ commit }) {
      commit("SET_POPUP_MENU", true);
    },
    /**
     * 弹出菜单关闭
     */
    ["PopupMenuClose"]({ commit }) {
      commit("SET_POPUP_MENU", false);
    }
  }
};

export default head;
