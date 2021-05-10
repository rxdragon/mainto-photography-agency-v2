import base from '../config'
<<<<<<< HEAD
import axios from '@/plugins/axios.js'
=======
import axios from '@/axios/index'
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6

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
