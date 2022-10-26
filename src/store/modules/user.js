const State = function () {
  this.userId = null,
  this.username = null,
  this.avatar = null,
  this.balance = 0,
  this.isProducer = false,
  this.isBlocked = false,
  this.ticketId = null,
  this.fetched = false
}

const state = new State()

const mutations = {
  setUser: (state, payload) => {
    Object.assign(state, payload)
    state.fetched = true
  },
  removeUser: state => {
    Object.assign(state, new State())
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

const getters = {
  userExists: (state) => {
    return state.userId !== null
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
