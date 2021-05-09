import Vue from 'vue'
import store from '@/store'
import router from '@/router'
import axios from 'axios'

export default class UserService {
  constructor () {
    if (!store.getters.userExists && !store.state.appLoaded) {
      this._userFetch = this.getUserData()
    }
  }

  /**
   * @returns {Promise}
   */
  get userFetch () {
    return this._userFetch
  }

  /**
   * @returns {Promise}
   */
  getUserData () {
    return axios.get('/user', { withCredentials: true })
      .then(({ data }) => {
        const user = data
        store.dispatch('user/setUser', user)

        if (!user.isProducer) {
          router.push('welcome')
        }
      })
      .catch(() => {
        store.dispatch('user/removeUser')
        store.dispatch('setError', 'Не удалось получить данные пользователя')

        Vue.notify({
          group: 'custom-notification',
          type: 'error',
          text: 'Ошибка авторизации пользователя.'
        })
      })
  }
}
