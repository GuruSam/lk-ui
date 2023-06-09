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
    return axios.get('/user')
      .then(({ data: user }) => {
        store.dispatch('user/setUser', user)

        if (!user.isProducer) {
          router.push('welcome')
        }

        if (user.isBlocked) {
          store.dispatch('setError', { code: null, message: 'Упс! Отказано в доступе.' })
        }
      })
      .catch(() => {
        store.dispatch('user/removeUser')
        store.dispatch('setError', { message: 'Ошибка авторизации пользователя' })

        Vue.notify({
          group: 'notifications',
          type: 'error',
          text: 'Ошибка авторизации пользователя.'
        })
      })
  }
}
