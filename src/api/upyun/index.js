import base from '../config'
<<<<<<< HEAD
import axios from '@/plugins/axios.js'
=======
import axios from '@/axios/index'
>>>>>>> e3633d95afd5e894053241692fe8a95f8b70f9e6

const upyun = {
  getConfig () {
    return axios.get(`${base.url}/photographer/common/sign/token`)
  },
  getHost () {
    return axios.get(`${base.url}/photographer/common/sign/getHost`)
  }
}
export default upyun
