import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store";
import routes from "./router";
import FastClick from "fastclick";
import "./config/rem";
import { routerMode } from "@/config";

if ("addEventListener" in document) {
  document.addEventListener(
    "DOMContentLoaded",
    function() {
      FastClick.attach(document.body);
    },
    false
  );
}

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== "production"
});

new Vue({
  router,
  store
}).$mount("#app");
