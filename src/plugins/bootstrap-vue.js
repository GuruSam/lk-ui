import Vue from 'vue'
import { BOverlay, TabsPlugin, TablePlugin, BPagination, BModal } from 'bootstrap-vue'

Vue.component('b-overlay', BOverlay)
Vue.component('b-pagination', BPagination)
Vue.component('b-modal', BModal)

Vue.use(TabsPlugin)
Vue.use(TablePlugin)
