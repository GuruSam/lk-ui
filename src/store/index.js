import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'

Vue.use(Vuex)

const state = {
  appLoaded: false,
  showLoader: false,
  error: null
}

const mutations = {
  appLoaded: (state, payload) => {
    state.appLoaded = payload
  },
  setError: (state, payload) => {
    state.error = payload
  },
  toggleLoader: (state, payload) => {
    state.showLoader = payload
  }
}

const actions = {
  setLoadingState: (ctx, loading) => {
    if (loading === true) {
      ctx.commit('toggleLoader', true)
    } else {
      ctx.commit('appLoaded', true)

      setTimeout(() => {
        ctx.commit('toggleLoader', false)
      }, 500);
    }
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
