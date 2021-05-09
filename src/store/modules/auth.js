const state = {
  loggedIn: false,
  xfToken: null
}

const mutations = {
  onLogoutSuccess: state => {
    state.loggedIn = false
  },
  loggedIn: state => {
    state.loggedIn = true
  },
  setXfToken: (state, payload) => {
    state.xfToken = payload
  }
}

const actions = {
  clearLogoutInfo: async (context) => {
    context.commit('onLogoutSuccess')
  },
  loggedIn: ctx => {
    ctx.commit('loggedIn')
  },
  setXfToken: (ctx, payload) => {
    ctx.commit('setXfToken', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
