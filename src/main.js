import Vue from 'vue'
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
