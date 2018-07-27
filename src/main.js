import Vue from 'vue'
import VueRouter from 'vue-router'

//css复位
import 'normalize.css/normalize.css'

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//全局css
import '@/styles/index.scss'

import routes from './router'
import store from './store/'
import { routerMode } from './config/env'
import './config/rem'
import FastClick from 'fastclick'

//fix click 300ms
if ('addEventListener' in document) {
	document.addEventListener('DOMContentLoaded', function () {
		FastClick.attach(document.body);
	}, false);
}

Vue.use(ElementUI)

/**
 * 路由跳转处理
 */
Vue.use(VueRouter)
const router = new VueRouter({
	routes,
	mode: routerMode,
	strict: process.env.NODE_ENV !== 'production',
})


new Vue({
	router,
	store,
}).$mount('#app')

