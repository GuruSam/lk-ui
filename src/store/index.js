import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'

Vue.use(Vuex)

const state = {
  appLoading: true,
  error: null
}

const mutations = {
  setLoadingState: (state, payload) => {
    state.appLoading = payload
  },
  setError: (state, payload) => {
    state.error = payload
  }
}

const actions = {
  setLoadingState: (ctx, payload) => {
    ctx.commit('setLoadingState', payload)
  },
  setError: (ctx, payload) => {
    ctx.commit('setError', payload)
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters: {},
  modules: {
    user: user,
    auth: auth
  }
})
