const initState = function () {
  this.userId = null,
  this.username = null,
  this.avatar = null,
  this.balance = 0,
  this.isProducer = false,
  this.ticketId = null
}

const state = new initState()

const mutations = {
  setUser: (state, payload) => {
    Object.assign(state, payload)
  },
  removeUser: state => {
    Object.assign(state, new initState())
  }
}

const actions = {
  setUser: (ctx, payload) => {
    ctx.commit('setUser', payload)
  },
  removeUser: ctx => {
    ctx.commit('removeUser')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
