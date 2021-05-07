import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import globals from './globals'
import '@/plugins'

Vue.config.productionTip = false

Vue.mixin({
  data: globals
})

store.dispatch('setLoadingState', true)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
