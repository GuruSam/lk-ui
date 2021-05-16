import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import store from '@/store/index'
import { authService, userService } from '@/services'

import WelcomeScreen from '@/views/WelcomeScreen'
import TicketsList from '@/views/tickets/TicketsList'
import CharactersList from '@/views/characters/CharactersList'
import TicketPage from '@/views/tickets/TicketPage'

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
      title: 'ЛК - Главная'
    }
  },
  {
    path: '/welcome',
    name: 'welcome-page',
    component: WelcomeScreen,
    meta: {
      title: 'Добро пожаловать в Лабиринт'
    },
    beforeEnter: (to, from, next) => {
      userService.userFetch.finally(() => {
        if (store.state.user.isProducer && store.state.auth.loggedIn) {
          return next('/dashboard')
        }

        next()
      })
    }
  },
  {
    path: '/tickets',
    name: 'tickets',
    component: TicketsList,
    meta: {
      title: 'Список заявок'
    }
  },
  {
    path: '/tickets/:id',
    name: 'ticket-page',
    component: TicketPage
  },
  {
    path: '/characters',
    name: 'characters',
    component: CharactersList,
    meta: {
      title: 'Мои персонажи'
    }
  }
]

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
  if (!store.state.appLoaded && store.state.showLoader) {
    return userService.userFetch.finally(() => {
        store.dispatch('setLoadingState', false)
        next()
      })
  }

  next()
})

export default router
