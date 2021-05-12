export default {
  state: {
    user: {
      id: '',
      username: '',
      nick: '',
      level: ''
    },
    steamid: ''
  },
  getters: {
    getUser: state => state.user,
    getSteamId: state => state.steamid
  },
  actions: {
    setUserInfo ({ commit }, userInfo) {
      commit('setUser', userInfo)
    },
    setSteamId ({ commit }, steamid) {
      commit('setSteam', steamid)
    }
  },
  mutations: {
    setUser (state, userInfo) {
      state.user = userInfo
    },
    setSteam (state, steamid) {
      state.steamid = steamid
    }
  }
}
