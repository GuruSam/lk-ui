import Vue from 'vue'
import Notifications from 'vue-notification'
import VueProgressBar from 'vue-progressbar'
import Breakpoint from './breakpoint'
import VueQuillEditor from 'vue-quill-editor'
import './bootstrap-vue.js'
import './dayjs.js'
import './vee-validate.js'
import './sentry.js'

import { quillOptions } from './editor/options'

const progressBarOptions = {
  color: '#01cae2',
  failedColor: '#874b4b',
  thickness: '3px'
}

Vue.use(Notifications)
Vue.use(VueProgressBar, progressBarOptions)
Vue.use(Breakpoint)
Vue.use(VueQuillEditor, quillOptions)
