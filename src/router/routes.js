import store from '@/store/index'
import { userService } from '@/services'

import Home from '@/views/Home'
import WelcomeScreen from '@/views/WelcomeScreen'
import ErrorScreen from '@/views/ErrorScreen'
import Join from '@/views/Join'
import JoinGuest from '@/views/JoinGuest'

// Characters
import CharactersList from '@/views/characters/CharactersList'

// NPC
import GeneralNpcList from '@/views/npc/GeneralNpcList'
import PersonalNpcList from '@/views/npc/PersonalNpcList'

// Tickets
import TicketsList from '@/views/tickets/TicketsList'
import TicketPage from '@/views/tickets/TicketPage'
import TicketCreate from '@/views/tickets/TicketCreate'
import TicketEdit from '@/views/tickets/TicketEdit'

// Producers
import ProducerList from '@/views/producers/ProducerList'

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  
  {
    path: '*',
    name: 'not-found',
    component: ErrorScreen,
    props: {
      code: '404',
      error: 'Страница не найдена'
    }
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
      title: 'Добро пожаловать в Лабиринт',
      guestOnly: true
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
    path: '/join',
    name: 'join',
    component: Join,
    meta: {
      title: 'Присоединиться к Лабиринту',
      guestOnly: true
    }
  },

  {
    path: '/join/guest',
    name: 'join-as-guest',
    component: JoinGuest,
    meta: {
      title: 'Присоединиться к Лабиринту',
      guestOnly: true
    }
  },

  {
    path: '/tickets',
    name: 'tickets',
    component: TicketsList,
    meta: {
      title: 'ЛК - Список заявок'
    }
  },

  {
    path: '/tickets/create',
    name: 'ticket-create',
    component: TicketCreate,
    meta: {
      title: 'ЛК - Создать заявку'
    }
  },

  {
    path: '/tickets/:id',
    name: 'ticket-page',
    component: TicketPage
  },

  {
    path: '/tickets/edit/:id',
    name: 'ticket-edit',
    component: TicketEdit
  },

  {
    path: '/characters',
    name: 'characters',
    component: CharactersList,
    meta: {
      title: 'ЛК - Мои персонажи'
    }
  },

  {
    path: '/npc',
    redirect: '/npc/personal'
  },

  {
    path: '/npc/general',
    name: 'npc-general',
    component: GeneralNpcList,
    meta: {
      title: 'ЛК - Общие NPC'
    }
  },

  {
    path: '/npc/personal',
    name: 'npc-personal',
    component: PersonalNpcList,
    meta: {
      title: 'ЛК - Личные NPC'
    }
  },

  {
    path: '/producers',
    name: 'producers',
    component: ProducerList,
    meta: {
      title: 'ЛК - Мои продюсеры'
    }
  },
]
