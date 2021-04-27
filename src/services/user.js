import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import router from '@/router'

export default class UserService {
  getUserData () {
    return axios.get('/user')
      .then(response => {
        store.dispatch('user/setUser', response.data)
      })
      .catch(() => {
        store.dispatch('user/removeUser')
        store.dispatch('auth/setError', 'Ошибка авторизации пользователя')
        router.push({ path: '/error' })

        Vue.notify({
          group: 'custom-notification',
          type: 'error',
          text: 'Ошибка авторизации пользователя.'
        })
      })
  }
}
