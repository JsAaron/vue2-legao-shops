import Vue from "vue";
import VueTouch from "vue-touch";
import store from "./store";
import router from "./router";
import App from "./App";

//https://github.com/vuejs/vue-touch/tree/next
Vue.use(VueTouch, { name: "v-touch" });

import "@/vant";
import "@/styles/common.scss";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
