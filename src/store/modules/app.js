import Cookies from "js-cookie";

const app = {
  state: {
    sidebar: {
      opened: true,
      withoutAnimation: false
    },
    device: "desktop",
    language: Cookies.get("language") || "en"
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
    }
  },
  actions: {
    /**
     * 通过点击目录缩放目录列表
     */
    ["TOGGLE_SIDEBAR"]({ commit }) {
      commit("TOGGLE_SIDEBAR");
    }
  }
};

export default app;
