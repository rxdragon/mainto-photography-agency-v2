import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './plugins/axios'
import './assets/styles/index.less'
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css' // 栅格隐藏
import ApiError from '@/plugins/ApiError.js'
import promiseFinally from 'promise.prototype.finally'
import './plugins/icon-font/iconfont.css' // 字体
import * as filters from './filters' // 全局过滤器
import '@assetsDir/styles/variables.less' // 全局样式
import './guards' // 路由守护
import get from 'lodash/get'

promiseFinally.shim()
window._ = { get }
Vue.config.productionTip = false

// 注入全局过滤器
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

// 判断是否是生产环境
Vue.prototype.$isDev = !process.env.VUE_APP_LOGIN_API.includes('online')

// 增加自定义ApiError
Vue.prototype.$ApiError = ApiError

Vue.prototype.routeBack = () => {
  router.go(-1)
}

Vue.config.productionTip = false

// 重新刷新
Vue.prototype.$refresh = (VueComponentObj) => {
  const view = VueComponentObj.$route
  const { fullPath } = view
  VueComponentObj.$router.replace({
    path: '/redirect' + fullPath
  })
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
