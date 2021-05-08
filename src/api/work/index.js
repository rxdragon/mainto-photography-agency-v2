import base from '../config'
import axios from '@/axios/index'

const work = {
  list (params) {
    return axios.get(`${base.url}/photographer/order/list`, { params })
  },
  add (params) {
    return axios.post(`${base.url}/photographer/order/add`, params)
  },
  detail (params) {
    return axios.get(`${base.url}/photographer/order/detail`, { params })
  },
  cancel (params) {
    return axios.post(`${base.url}/photographer/order/cancel`, params)
  }
}
export default work
