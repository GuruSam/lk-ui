import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { userService } from '@/services'
import globals from './globals'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import VueProgressBar from 'vue-progressbar'

Vue.config.productionTip = false

const options = {
  color: '#01cae2',
  failedColor: '#874b4b',
  thickness: '3px'
}

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueProgressBar, options)

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
