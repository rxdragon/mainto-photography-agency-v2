import base from './config'
import axios from '@/plugins/axios'

const upyun = {
  getConfig () {
    return axios.get(`${base.url}/photographer/common/sign/token`)
  },
  getHost () {
    return axios.get(`${base.url}/photographer/common/sign/getHost`)
  }
}
export default upyun
