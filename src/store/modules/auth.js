const state = {
  loggedIn: false,
  error: null
}

const mutations = {
  onLogoutSuccess: state => {
    state.loggedIn = false
  },
  loggedIn: state => {
    state.loggedIn = true
  },
  setError: (state, payload) => {
    state.error = payload
  }
}

const actions = {
  clearLogoutInfo: async (context) => {
    context.commit('onLogoutSuccess')
  },
  loggedIn: ctx => {
    ctx.commit('loggedIn')
  },
  setError: (ctx, payload) => {
    ctx.commit('setError', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
