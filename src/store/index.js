import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  latitude: '', // 当前位置纬度
  longitude: '', // 当前位置经度
  cartList: {}, // 加入购物车的商品列表
  cartPrice: null, //会员卡价格
}

export default new Vuex.Store({
  state
})
