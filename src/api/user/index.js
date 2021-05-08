import base from '../config'
import axios from '@/axios/index'

// const tokens = {
//   admin: {
//     token: 'admin-token'
//   },
//   editor: {
//     token: 'editor-token'
//   }
// }

// const users = {
//   'admin-token': {
//     roles: ['admin'],
//     introduction: 'I am a super administrator',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Super Admin'
//   },
//   'editor-token': {
//     roles: ['editor'],
//     introduction: 'I am an editor',
//     avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//     name: 'Normal Editor'
//   }
// }

const user = {
  loginOut () {
    return axios.get(`${base.manage_auth}/logout`)
  },
  loginAuth (params, config = {}) {
    return axios.post(`${base.manage_auth}/cloud3rdLogin`, params, config)
  },
  getInfo () {
    return axios.get(`${base.url}/userInfo`)
  }
}
export default user
