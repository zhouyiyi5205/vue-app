import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import Example from '@/views/Example'
import IDCardExample from '@/views/Example/IDCardExample'
import Home from '@/views/Home'
import HomeNoRealName from '@/views/Home/HomeNoRealName'
import HomeNoBind from '@/views/Home/HomeNoBind'
import HomeAll from '@/views/Home/HomeAll';

import Bind from '@/views/Bind';
import SelectContent from '@/views/Bind/module/selectContent';
import HouseholderInfo from '@/views/Bind/householderInfo';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Home/HomeNoRealName',
      name: 'HomeNoRealName',
      component: HomeNoRealName
    },
    {
      path: '/Home/HomeNoBind',
      name: 'HomeNoBind',
      component: HomeNoBind
    },
    {
      path: '/Home/HomeAll',
      name: 'HomeAll',
      component: HomeAll
    },
    {
      path: '/Bind',
      name: 'Bind',
      component: Bind,
    },
    
    {
      path: '/Bind/householderInfo',
      name: 'HouseholderInfo',
      component: HouseholderInfo
    },
    {
      path: '/Bind/module/selectContent',
      name: 'SelectContent',
      component: SelectContent,
      // meta: {
      //   keepAlive: false
      // }
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
