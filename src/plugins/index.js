import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import Notifications from 'vue-notification'
import VueProgressBar from 'vue-progressbar'

const progressBarOptions = {
  color: '#01cae2',
  failedColor: '#874b4b',
  thickness: '3px'
}

Vue.use(BootstrapVue)
Vue.use(Notifications)
Vue.use(VueProgressBar, progressBarOptions)
