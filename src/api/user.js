import base from './config'
import axios from '@/plugins/axios'
import * as SessionTool from '@/utils/sessionTool.js'

const user = {
  loginOut () {
    return axios.get(`${base.manage_auth}/logout`)
  },
  loginAuth (params, config = {}) {
    return axios.post(`${base.manage_auth}/cloud3rdLogin`, params, config)
  },
  getInfo () {
    return axios.get(`${base.url}/userInfo`)
  }
}

/**
 * @description 退出登入
 */
export function logout () {
  return axios({
    url: `${base.manage_auth}/logout`,
    method: 'GET'
  }).then(() => {
    for (const key in window.polling) {
      clearTimeout(window.polling[key])
    }
  })
}

/**
 * @description 使用token进行登录
 */
export function login (params, config = {}) {
  return axios.post(`${base.manage_auth}/cloud3rdLogin`, params, config)
}

/**
 * @description 获取用户信息
 */
export function getInfo () {
  return axios({
    url: `${base.url}/userInfo`,
    method: 'GET'
  })
}

/**
 * @description 获取个人权限
 */
export async function getAuthority () {
  const res = await axios({
    url: `${base.url}/userInfo`,
    method: 'GET'
  })
  return !res.msg.permissions ? [] : res.msg.permissions
}

/**
 * @description 判断缓存是否过期
 */
export function userExpire () {
  SessionTool.setXStreamIdExpireTime(10000000)
}

export default user
