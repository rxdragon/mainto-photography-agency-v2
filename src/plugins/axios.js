import axios from 'axios'
import store from '../store'
import * as SessionTool from '@/utils/sessionTool.js'
import { message } from 'element-ui'
import { errorCode } from '@/plugins/errorCode'
const errorHandle = (status) => {
  switch (status) {
    case 401:
      message.error('权限不足', () => {
        window.localStorage.clear()
        window.location.reload()
      })
      break
  }
}

const instance = axios.create({ timeout: 1000 * 12 })
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

instance.interceptors.request.use(
  config => {
    const steamId = store.getters.getSteamId
    if (steamId) {
      config.headers['x-stream-id'] = steamId
    }
    return config
  },
  error => Promise.error(error)
)

instance.interceptors.response.use(
  res => {
    if (res.headers['x-stream-id']) {
      SessionTool.setXStreamId(res.headers['x-stream-id'])
      store.dispatch('setSteamId', res.headers['x-stream-id'])
    }
    return Promise.resolve(res.data)
  },
  error => {
    const { response } = error
    if (response) {
      errorHandle(response.status)
      response.data.error_msg = errorCode.getMsg(response.data)
      return Promise.reject(response)
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject({ data: { error_msg: '网络无响应, 请稍候重试!' } })
  }
)

export default instance
