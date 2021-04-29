import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default class UserService {
  getUserData () {
    return axios.get('/user')
      .then(({ data }) => {
        const user = data
        store.dispatch('user/setUser', user)

        if (!user.isProducer) {
          router.push('welcome')
        }
      })
      .catch(() => {
        store.dispatch('user/removeUser')
        store.dispatch('setError', 'Ошибка авторизации пользователя')

        Vue.notify({
          group: 'custom-notification',
          type: 'error',
          text: 'Ошибка авторизации пользователя.'
        })
      })
  }
}
