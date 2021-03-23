import Vue from 'vue'
import App from './App.vue'
import router from './router'
import globals from './globals'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.mixin({
  data: globals
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
