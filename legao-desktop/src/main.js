import Vue from "vue";
import FastClick from "fastclick";

import App from "./App";

import ElementUI from "element-ui";
import "normalize.css";
import "@/styles/index.scss";
import "@/styles/element-ui.scss";

//国际化
import i18n from "./lang";

//路由守卫
import store from "./store";
import router from "./router";

//vue-svg-icon
import Icon from "vue-svg-icon/Icon.vue";

//模拟数据
import "./mock";

Vue.component("icon", Icon);

//fix click 300ms
if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

Vue.use(ElementUI, {
  size: "medium",
  i18n: (key, value) => i18n.t(key, value)
});

new Vue({
  el: "#app",
  router,
  store,
  i18n,
  render: h => h(App)
});
