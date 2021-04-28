const state = {
  loggedIn: false
}

const mutations = {
  onLogoutSuccess: state => {
    state.loggedIn = false
  },
  loggedIn: state => {
    state.loggedIn = true
  }
}

const actions = {
  clearLogoutInfo: async (context) => {
    context.commit('onLogoutSuccess')
  },
  loggedIn: ctx => {
    ctx.commit('loggedIn')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
