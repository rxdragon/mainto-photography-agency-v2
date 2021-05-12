import Api from '@/api/index.js'
import { message } from 'element-ui'
export default {
  state: {
    config: {
      token: ''
    },
    host: process.env.VUE_APP_DOMAIN
  },
  getters: {
    getUpyun: state => state.config,
    getHost: state => state.host
  },
  actions: {
    initUpyun ({ commit }) {
      Api.upyun.getConfig().then(res => {
        const config = { token: res.msg }
        commit('setUpyun', config)
        Api.upyun.getHost().then(res => {
          commit('setHost', res.msg)
        })
      }).catch((e) => {
        message.error(e.data.error_msg, 15)
      })
    }
  },
  mutations: {
    setUpyun (state, config) {
      state.config = config
    },
    setHost (state, host) {
      state.host = host
    }
  }
}
