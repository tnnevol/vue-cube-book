import Vue from 'vue'
import Router from 'vue-router'
import routerOpts from '@/router/routersTable'
import { mapRoute } from '@/router/routerFilter'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: mapRoute(routerOpts)
})
