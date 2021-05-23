import Vue from 'vue'
import axios from 'axios'
import platform from 'platform'
import { tokenService } from './index'
import store from '../store'

export default class AuthService {
  constructor () {
    this.authAPI = process.env.VUE_APP_AUTH_API_BASE_URL
    axios.defaults.headers['Device-Info'] = this.getDeviceInfo()
  }

  userLogout () {
    return axios({
      url: '/logout',
      baseURL: this.authAPI,
      method: 'POST'
    })
      .then(() => {
        this.logout()

        return Promise.resolve()
      })
      .catch((error) => {
        Vue.notify({ group: 'custom-notification', type: 'error', text: error.response.data.message })

        return Promise.reject(error)
      })
  }

  logout () {
    tokenService.removeToken()
    store.dispatch('user/removeUser')
    store.dispatch('auth/clearLogoutInfo')
    
    this.redirectToLogin()
  }

  refreshToken () {
    return axios({
      url: '/refresh',
      baseURL: this.authAPI,
      method: 'POST',
      data: {
        'refreshToken': tokenService.getToken().refreshToken
      }
    })
      .then((response) => {
        tokenService.saveToken(response.data)

        return Promise.resolve(tokenService.getToken().accessToken)
      })
      .catch((error) => {
        this.logout()

        return Promise.reject(error)
      })
  }

  redirectToLogin () {
    window.location.replace(process.env.VUE_APP_LOGIN_PAGE_URL)
  }

  getDomain () {
    return window.location.hostname === 'localhost' ? window.location.hostname : process.env.VUE_APP_COOKIE_DOMAIN
  }

  getDeviceInfo () {
    return `${platform.os};${platform.name};${platform.version};labirint`
  }

  getXfToken () {
    return axios.get('/user/xf-token', { withCredentials: true })
      .catch(({ response }) => {
        Vue.notify({
          group: 'notifications',
          type: 'error',
          title: 'Не удалось авторизовать персонажа',
          text: response.data.message,
          duration: -1
        })
      })
  }
}
