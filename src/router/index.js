import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import { authService as auth, userService as user } from '@/services'
import routes from './routes'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!store.state.auth.loggedIn) {
    return auth.redirectToLogin()
  }

  const user = store.state.user

  if (user.fetched && !user.isProducer && to.name !== 'welcome-page') {
    return next('/welcome')
  }
  
  next()
})

router.beforeResolve((to, from, next) => {
  document.title = to.meta.title || document.title

  if (store.getters.appLoading) {
    return user.userFetch.finally(() => {
        store.dispatch('setLoadingState', false)
        next()
      })
  }

  if (store.getters.hasError) {
    store.dispatch('setError', { code: null, message: null })
  }

  next()
})

export default router
