import Vue from 'vue'
import Vuex from 'vuex'
import upyun from './modules/upyun'
import user from './modules/user'
import work from './modules/work'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    upyun,
    work
  },
  plugins: [
    createPersistedState()
  ]
})

export default store
