import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import router from '../router'

const _axios = axios.create({
  baseURL: process.env.BASE_URL,
  // withCredentials: true,
  timeout: 30000,
  headers: {
    "Access-Control-Allow-Origin": "*",
  }
})

// request拦截器
_axios.interceptors.request.use(
  config => {
    if (store.state.auth.token) {
      config.headers['Authorization'] = store.state.auth.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// respone拦截器
_axios.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          Vue.prototype.$toast('抱歉！您没有该项操作权限！')
          break
        case 401:
          // token过期，退出登录，跳转登录页
          store.commit('auth/SET_LOGOUT')
          router.replace('/login')
          break
        default:
      }
    }
    return Promise.reject(error.response)
  }
)

// 封装axios
const request = function (type = 'get', url, data, config, origin = false) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await _axios[type](url, data, config)

      if (origin) {
        resolve(res)
      } else if (res.status === 'complete') {
        resolve(res.resultData)
      } else {
        Vue.prototype.$toast(res.errorMessage)
        reject(res)
      }
    } catch (err) {
      reject(err)
    }
  })
}

export default request
