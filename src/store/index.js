import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import interceptor from './modules/interceptor'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    interceptor
  },
  getters
})