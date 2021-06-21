import router from './router'
import store from './store'
import getPageTitle from '@/utils/getPageTitle' // 获取页面title
import { getXStreamId } from '@/utils/sessionTool' // get token from cookie
import * as User from '@/api/user.js'

const whiteList = ['/', '/login', '/auth-redirect', '/401', '/404'] // 白名单

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  const hasXStreamId = getXStreamId() // 获取token
  // 没有过期时的操作
  async function noExpire () {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (whiteList.includes(to.path)) {
        next()
      }
      const { name } = store.getters
      if (name) {
        next()
      } else {
        await store.dispatch('userStore/getUserInfo')
        next({ ...to, replace: true })
      }
    }
  }
  
  function goLogin () {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
  
  if (hasXStreamId) {
    // 下次的过期时间
    const expireTime = new Date().getTime() + 24 * 60 * 60 * 1000
    const nowTime = new Date().getTime()
    const discrepancyTime = expireTime - nowTime
    if (discrepancyTime > 0) {
      // 过期时间小于1小时续上
      if (discrepancyTime < 60 * 60 * 1000) {
        await User.userExpire()
      }
      noExpire()
    } else if (discrepancyTime < 0) {
      User.logout()
      goLogin()
    }
  } else {
    goLogin() // 没有xStreamId
  }
})

router.afterEach(() => {
  const appLoading = document.getElementById('loading-bg')
  if (appLoading) {
    appLoading.style.display = 'none'
  }
})
