import Vue from "vue";
import VueRouter from "vue-router";
import { routerMode } from "@/config";
import routes from "./defaultMap";
import permission from "./permission";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== "production"
});

permission(router);

export default router;
