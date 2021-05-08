import base from '../config'
import axios from '@/axios/index'

const manage = {
  list (params) {
    return axios.get(`${base.url}/photographer/subuser/list`, { params })
  },
  disable (params) {
    return axios.post(`${base.url}/photographer/subuser/disable`, params)
  },
  enable (params) {
    return axios.post(`${base.url}/photographer/subuser/enable`, params)
  },
  create (params) {
    return axios.post(`${base.url}/photographer/subuser/add`, params)
  },
  edit (params) {
    return axios.post(`${base.url}/photographer/subuser/editUser`, params)
  }
}
export default manage
