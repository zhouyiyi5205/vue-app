import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Home from '@/views/Home'
import Example from '@/views/Example'
import IDCardExample from '@/views/Example/IDCardExample'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Example',
      name: 'Example',
      component: Example
    },
    {
      path: '/Example/IDCardExample',
      name: 'IDCardExample',
      component: IDCardExample
    }
  ]
})
