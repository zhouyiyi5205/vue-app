import router from '@/router'
import store from '@/store'
import Storage from '@/utils/storage'
import {checkToken} from '@/api/auth'

router.beforeEach(async (to, from, next) => {
  // 确认token和用户信息
  if (!store.state.auth.token || !store.state.auth.user) {
    const _user = Storage.get('user')
    if (_user) {
      store.commit('auth/SET_TOKEN', _user.token)
      store.commit('auth/SET_USER', _user)
    }
  }

  // 检查token和用户信息
  if (!store.state.auth.token || !store.state.auth.user) {
    // 数据不存在，跳转登录页
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  } else {
    const needCheck = true
    if (needCheck) {
      // 校验token
      try {
        const isValid = await checkToken()
        if (isValid) {
          // 校验通过跳转相应页面
          next()
        } else {
          /* eslint-disable no-throw-literal */
          throw 'invalid token'
        }
      } catch (err) {
        // 校验不通过，跳转登录页
        if (to.path === '/login') {
          next()
        } else {
          next('/login')
        }
      }
    } else {
      // 也可不校验token，接口内部校验结合响应拦截自动处理，更合理
      next()
    }
  }
})
