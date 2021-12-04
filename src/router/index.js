import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { authService, userService } from '@/services'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || from.meta.title || document.title

  if (!store.state.auth.loggedIn) {
    return authService.redirectToLogin()
  }
  
  next()
})

router.beforeResolve((to, from, next) => {
  if (store.getters.appLoading) {
    return userService.userFetch.finally(() => {
        store.dispatch('setLoadingState', false)
        next()
      })
  }

  next()
})

export default router
