// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
// import '@/utils/permission' // 检测token
import weui from 'weui.js'
import 'weui'
import '../static/js/flexible';
import $ from 'jquery'

Vue.prototype.$weui = weui
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
