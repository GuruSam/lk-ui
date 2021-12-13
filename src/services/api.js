import Vue from 'vue'
import axios from 'axios'
import { authService, tokenService, userService } from './index'
import store from '@/store'

export default class ApiService {
  constructor () {
    this._mountErrorHandler()
    this.setAuthHeader()

    this.refreshPending = null
    axios.defaults.baseURL = process.env.VUE_APP_LK_API_BASE_URL
  }

  setAuthHeader () {
    const accessToken = tokenService.getToken().accessToken

    if (accessToken) {
      axios.defaults.headers.common['AccessToken'] = accessToken
    }
  }

  removeAuthHeader () {
    axios.defaults.headers.common = {}
  }

  getAuthToken () {
    if (!this.refreshPending) {
      this.refreshPending = authService.refreshToken()
      this.refreshPending.then((accessToken) => {
        this.refreshPending = null

        return Promise.resolve(accessToken)
      })
    }

    return this.refreshPending
  }

  _mountErrorHandler () {
    axios.interceptors.response.use(response => {
      return response
    }, async error => {
      switch (error.response.status) {
        case 401:
          return this._handle401(error)

        case 403:
          authService.userLogout()
          break;

        case 404:
          this._handle404()
          break;

        default:
          this._handleError(error)
          break;
      }

      return Promise.reject(error)
    })
  }

  _handle401 (error) {
    if (error.response.config) {
      return this.getAuthToken()
        .then((accessToken) => {
          this.setAuthHeader()
          error.response.config.headers['AccessToken'] = accessToken

          return axios.request(error.config)
        })
    }
  }

  _handle404 () {
    if (store.getters.appLoading) {
      store.dispatch('setError', { code: '404', message: 'Страница не найдена' })
      userService.userFetch
        .then(() => store.dispatch('setLoadingState', false))
    }
  }

  _handleError (error) {
    Vue.notify({
      group: 'notifications',
      type: 'error',
      text: error.response.data.message ?? 'Ошибка. Попробуйте еще раз'
    })
  }
}
