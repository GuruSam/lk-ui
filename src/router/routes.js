import store from '@/store/index'
import { userService } from '@/services'

import Home from '@/views/Home'
import WelcomeScreen from '@/views/WelcomeScreen'
import TicketsList from '@/views/tickets/TicketsList'
import CharactersList from '@/views/characters/CharactersList'
import TicketPage from '@/views/tickets/TicketPage'
import TicketCreate from '@/views/tickets/TicketCreate'

export default [
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
    path: '/tickets/create',
    name: 'ticket-create',
    component: TicketCreate,
    meta: {
      title: 'Создать заявку'
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
