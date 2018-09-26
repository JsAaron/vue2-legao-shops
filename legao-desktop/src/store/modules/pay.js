const qr = {
  state: {
    data: {
      plat: "", //支付平台money
      money: "" //金额
    },
    qrVisible: false //支付二维码
  },
  mutations: {
    ["SET_QR"]: (state, value) => {
      state.qrVisible = value;
    },
    ["SET_DATA"]: (state, value) => {
      state.data = value;
    }
  },
  actions: {
    /**
     * 打开二维码支付
     */
    ["QrOpen"]({ commit }, data) {
      commit("SET_QR", true);
      commit("SET_DATA", data);
    },
    /**
     * 关闭二维支付
     */
    ["QrClose"]({ commit }, plat) {
      commit("SET_QR", false);
    }
  }
};

export default qr;
