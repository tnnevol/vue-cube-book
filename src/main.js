import Vue from 'vue'
import './cube-ui'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import customTools from '@/utils/tools'
import axios from '@/utils/request'

import 'amfe-flexible'
import '@/assets/css/fn.less'

Vue.config.productionTip = false
Vue.config.devtools = process.env.NODE_ENV === 'development'
Vue.prototype.routerPush = customTools.RouterLink
Vue.prototype.ajax = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
