import Vue from 'vue'
import VueRouter from 'vue-router'
import FastClick from 'fastclick'

//css复位
import 'normalize.css/normalize.css'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//全局css
import '@/styles/index.scss'

import routes from './router'
import store from './store/'

//国际化
import i18n from './lang'
//设置根rem
// import './config/rem'
//路由守卫
import guards from './guards'
import { routerMode } from './config/env'
//vue-svg-icon
import Icon from 'vue-svg-icon/Icon.vue';
Vue.component('icon', Icon);

//fix click 300ms
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function() {
    FastClick.attach(document.body);
  }, false);
}

Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})

/**
 * 路由跳转处理
 */
Vue.use(VueRouter)
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
})
guards(router)

new Vue({
  router,
  store,
  i18n
}).$mount('#app')