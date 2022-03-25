import Vue from 'vue'
import { BOverlay, TabsPlugin, TablePlugin, BPagination } from 'bootstrap-vue'

Vue.component('b-overlay', BOverlay)
Vue.component('b-pagination', BPagination)

Vue.use(TabsPlugin)
Vue.use(TablePlugin)
