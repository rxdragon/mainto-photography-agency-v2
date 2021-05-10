import base from '../config'
import axios from '@/plugins/axios.js'

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
export default user
