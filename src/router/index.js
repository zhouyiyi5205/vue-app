import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Home from '@/views/Home'
import Example from '@/views/Example'
import IDCardExample from '@/views/Example/IDCardExample'
import HomeNoRealName from '@/views/Home/HomeNoRealName'
import HomeNoBound from '@/views/Home/HomeNoBound'
import HomeAll from '@/views/Home/HomeAll'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    // ---- 未实名已绑定
    {
      path: '/Home/HomeNoRealName',
      name: 'HomeNoRealName',
      component: HomeNoRealName
    },
    //---- 已实名未绑定
    {
      path: '/Home/HomeNoBound',
      name: 'HomeNoBound',
      component: HomeNoBound
    },
    // ----- 已实名已绑定
    {
      path: '/Home/HomeAll',
      name: 'HomeAll',
      component: HomeAll
    },
    // ----- 示例路由 后期可删除
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
