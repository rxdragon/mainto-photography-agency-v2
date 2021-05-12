import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import './assets/style/reset.css'
import './plugins/element.js'
import promiseFinally from 'promise.prototype.finally'
import get from 'lodash/get'

promiseFinally.shim()
window._ = { get }

sessionStorage.clear()
Vue.prototype.$cutDown = '!thumb.small.50'
Vue.prototype.routeView = (address) => {
  router.push({ path: address })
}
Vue.prototype.routeBack = () => {
  router.go(-1)
}

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
