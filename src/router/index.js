import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import WelcomeScreen from '../views/WelcomeScreen'
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
  },
  {
    path: '/welcome',
    name: 'welcome-page',
    component: WelcomeScreen,
    meta: {
      title: 'Добро пожаловать в Лабиринт'
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

  if (!store.state.user.isProducer && to.path !== '/welcome') {
    return next('/welcome')
  }

  if (to.path === '/') {
    return next('/dashboard')
  }
  
  next()
})

export default router
