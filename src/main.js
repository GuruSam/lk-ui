import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import layoutHelpers from '@/components/layout/helpers.js'
import '@/plugins'

Vue.config.productionTip = false

Vue.mixin({
  data: () => ({
    layoutHelpers
  })
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
