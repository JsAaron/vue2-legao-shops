import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  routerMode
} from '@/config/env'
import routes from './defaultMap';
import interceptor from './interceptor'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== 'production',
})

interceptor(router)

export default router