import base from '../config'
import axios from '@/axios/index'

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
