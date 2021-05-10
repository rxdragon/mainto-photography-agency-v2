import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
<<<<<<< HEAD

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// 批量倒入modules模块
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 设置 './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  modules,
=======
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    user
  },
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
  getters
})

export default store
