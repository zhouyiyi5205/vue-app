import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Home from '@/views/Home'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
      // component: (resolve) => require(['@/views/HelloWorld'], resolve)
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
  ]
})
