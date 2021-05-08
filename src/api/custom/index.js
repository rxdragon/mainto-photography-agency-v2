import base from '../config'
import axios from '@/axios/index'

const custom = {
  list () {
    return axios.get(`${base.url}/manage/banner/getList`)
  }
}
export default custom
