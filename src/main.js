import Vue from 'vue'
<<<<<<< HEAD
import App from './App.vue'
import './registerServiceWorker'
import ApiError from '@/plugins/ApiError.js'
import router from './router'
import store from './store'
import './plugins/element.js' // ui布局
import '@assetsDir/styles/variables.less' // 全局样式

Vue.config.productionTip = false

// 增加自定义ApiError
Vue.prototype.$ApiError = ApiError

// 判断是否是生产环境
Vue.prototype.$isDev = !process.env.VUE_APP_LOGIN_API.includes('online')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
=======

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6
