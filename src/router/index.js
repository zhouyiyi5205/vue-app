import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/pages/HelloWorld'
import Home from '@/pages/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
      // component: (resolve) => require(['@pages/HelloWorld'], resolve)
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
  ]
})
