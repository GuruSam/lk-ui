import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { userService } from '@/services'
import globals from './globals'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Notifications)

Vue.mixin({
  data: globals
})

if (store.state.auth.loggedIn) {
  store.dispatch('setLoadingState', true)
  userService.getUserData()
    .finally(() => store.dispatch('setLoadingState', false))
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
