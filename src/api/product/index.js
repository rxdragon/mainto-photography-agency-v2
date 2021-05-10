import base from '../config'
<<<<<<< HEAD
import axios from '@/plugins/axios.js'
=======
import axios from '@/axios/index'
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6

const product = {
  add (params) {
    return axios.post(`${base.url}/photographer/product/add`, params)
  },
  readd (params) {
    return axios.post(`${base.url}/photographer/product/readd`, params)
  },
  list (params) {
    return axios.get(`${base.url}/photographer/product/list`, { params })
  },
  listAll (params) {
    return axios.get(`${base.url}/photographer/product/name/all`, { params })
  },
  detail (params) {
    return axios.get(`${base.url}/photographer/product/detail`, { params })
  },
  switch (params) {
    return axios.get(`${base.url}/photographer/product/switch`, { params })
  }
}
export default product
