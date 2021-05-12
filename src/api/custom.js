import base from './config'
import axios from '@/plugins/axios'

const custom = {
  list () {
    return axios.get(`${base.url}/manage/banner/getList`)
  }
}
export default custom
