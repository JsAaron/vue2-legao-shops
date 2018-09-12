/**
 * 分页状态列表
 */
const limit = {
  state: {
    inventory: 10, //库存管理数
    order: 4 //订单
  },
  mutations: {
    ["SET_INVENTORY"](state, value) {
      state.inventory = value;
    },
    ["SET_ORDER"](state, value) {
      state.order = value;
    }
  },
  actions: {
    ["SaveInventoryLimit"]({ commit }, value) {
      commit("SET_INVENTORY", value);
    },
    ["SaveOrderLimit"]({ commit }, value) {
      commit("SET_ORDER", value);
    }
  }
};

export default limit;
