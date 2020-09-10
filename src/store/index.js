import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const debug = true

export default new Vuex.Store({
  modules: {
    home
  },
  plugins: debug ? [createLogger()] : []   // 是否开启vuex的debug模式
})



// import Vue from 'vue'
// import Vuex from 'vuex'
// import getters from './getters'


// Vue.use(Vuex)
// const store = new Vuex.Store({
//   modules: {
//     app,
//     user,
//     mes,
//     map,
//     topTab,
//     content
//   },
//   getters
// })

// export default store
