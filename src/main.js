import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globals from './globals'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(Notifications)

Vue.mixin({
  data: globals
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
