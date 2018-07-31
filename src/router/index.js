import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routerMode
} from '@/config/env'
import routes from './defaultMap';

Vue.use(VueRouter)

export default new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
})