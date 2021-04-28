import Vue from 'vue'
import axios from 'axios'
import store from '@/store'

export default class UserService {
  getUserData () {
    return axios.get('/user')
      .then(response => {
        store.dispatch('user/setUser', response.data)
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
