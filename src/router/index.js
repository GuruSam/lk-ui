import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import WelcomeScreen from '@/views/WelcomeScreen'
import ErrorPage from '@/views/ErrorPage'
import store from '@/store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/dashboard'
  },
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
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorPage,
    beforeEnter: (to, from, next) => {
      if (!store.state.auth.error) {
        return next('dashboard')
      }

      next()
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

  if (!store.state.auth.loggedIn) {
    return window.location.replace(process.env.VUE_APP_LOGIN_PAGE_URL)
  }

  if (!store.state.user.isProducer && to.path !== '/welcome' && to.path !== '/error') {
    console.log('redirecting')
    return next('/welcome')
  }
  
  next()
})

export default router
