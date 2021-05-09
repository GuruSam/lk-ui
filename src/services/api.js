import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import { authService, tokenService } from './index'

export default class ApiService {
  constructor () {
    this._mount401Interceptor()
    this._mount403Interceptor()
    this._mount500Interceptor()
    this._mountXfTokenInterceptor()
    this.setAuthHeader()

    this.refreshPending = null
    axios.defaults.baseURL = process.env.VUE_APP_LK_API_BASE_URL
    axios.defaults.withCredentials = true
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

  _mount401Interceptor () {
    axios.interceptors.response.use(response => {
      return response
    }, error => {
      if (error.response.status === 401 && error.response.config) {
        return this.getAuthToken()
          .then((accessToken) => {
            this.setAuthHeader()
            error.response.config.headers['AccessToken'] = accessToken

            return axios.request(error.config)
          })
      }

      return Promise.reject(error)
    })
  }

  _mount403Interceptor () {
    axios.interceptors.response.use(response => {
      return response
    }, async error => {
      if (error.response.status === 403) {
        authService.userLogout()
      }

      return Promise.reject(error)
    })
  }

  _mount500Interceptor () {
    axios.interceptors.response.use(response => {
      return response
    }, async error => {
      if (error.response.status === 500) {
        Vue.notify({
          group: 'custom-notification',
          type: 'error',
          text: error.response.data.message
        })
      }

      return Promise.reject(error)
    })
  }

  _mountXfTokenInterceptor () {
    axios.interceptors.response.use(response => {
      if (response.headers['xf-token']) {
        store.dispatch('auth/setXfToken', response.headers['xf-token'])
      }

      return response
    }, async error => {
      return Promise.reject(error)
    })
  }
}
