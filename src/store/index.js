import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import auth from './modules/auth'

Vue.use(Vuex)

const state = {
  appLoaded: false,
  showLoader: true,
  appError: {
    code: null,
    message: null
  }
}

const mutations = {
  appLoaded: (state, payload) => {
    state.appLoaded = payload
  },
  setError: (state, payload) => {
    state.appError.code = payload.code
    state.appError.message = payload.message
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
      // Чтобы избежать дергания содержимого страницы после appLoaded = true
      setTimeout(() => ctx.commit('toggleLoader', false), 0)
    }
  },
  setError: (ctx, payload) => ctx.commit('setError', payload)
}

const getters = {
  appLoading: state => state.appLoaded === false && state.showLoader === true,
  hasError: state => state.appError.code || state.appError.message ? true : false
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user, auth
  }
})
