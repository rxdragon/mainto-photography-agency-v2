import base from '../config'
import axios from '@/plugins/axios.js'

const custom = {
  list () {
    return axios.get(`${base.url}/manage/banner/getList`)
  }
}
export default custom
