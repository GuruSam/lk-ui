import Vue from 'vue'
import { BOverlay, TabsPlugin, TablePlugin, BPagination, BModal, BTooltip } from 'bootstrap-vue'

Vue.component('b-overlay', BOverlay)
Vue.component('b-pagination', BPagination)
Vue.component('b-modal', BModal)
Vue.component('b-tooltip', BTooltip)

Vue.use(TabsPlugin)
Vue.use(TablePlugin)
