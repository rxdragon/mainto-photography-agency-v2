import Vue from 'vue'
import Vuex from 'vuex'
import upyun from './modules/upyun'
import user from './modules/user'
import work from './modules/work'
import permission from './modules/permission'
import userStore from './modules/userStore.js'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    userStore,
    user,
    upyun,
    work,
    permission
  },
  getters,
  plugins: [
    createPersistedState()
  ]
})

export default store
