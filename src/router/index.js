import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Home,
    meta: {
      title: 'Личный кабинет продюсера'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title

  if (!store.state.auth.loggedIn && to.path !== '/welcome') {
    return next('/welcome')
  }

  if (to.path === '/') {
    return next('/dashboard')
  }
  
  next()
})

export default router
