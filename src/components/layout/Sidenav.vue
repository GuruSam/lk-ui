<template>
  <sidenav orientation="vertical" class="sidenav-vertical layout-sidenav">
    <div class="sidenav-inner">
      <div class="sidenav-horizontal">
        <div class="card bg-transparent">
          <div class="card-body text-center user-block">
            <img :src="user.avatar" alt class="rounded-circle mt-2 mb-3 avatar">
            <h5 class="mb-2">{{ user.username }}</h5>
            <p class="text-muted small">{{ balance }}</p>
          </div>
          <!-- <div class="card-footer text-center p-0">
            <div class="row no-gutters row-bordered">
              <a href="#" class="d-flex col flex-column text-body py-3">
                <i class="ion d-block ion-md-notifications icon-size">
                  <span class="badge badge-danger indicator">12</span>
                </i>
              </a>
              <a href="#" class="d-flex col flex-column text-body py-3">
                <i class="ion d-block ion-md-settings icon-size"></i>
              </a>
            </div>
          </div> -->
        </div>
      </div>
      <sidenav-router-link icon="ion ion-md-speedometer" to="/dashboard" :active="isMenuActive('/dashboard')" :exact="true">Главная</sidenav-router-link>
      <sidenav-router-link icon="ion ion-ios-mail" to="/tickets" :active="isMenuActive('/tickets')" :exact="true">Заявки</sidenav-router-link>
      <sidenav-router-link icon="ion ion-ios-contacts" to="/producers" :active="isMenuActive('/producers')" :exact="true" :disabled="true">
        Продюсеры
        <span class="badge badge-pill badge-default">Скоро</span>
      </sidenav-router-link>
      <sidenav-router-link icon="ion ion-ios-contacts" to="/characters" :active="isMenuActive('/characters')" :exact="true">Персонажи</sidenav-router-link>
      <sidenav-menu icon="ion ion-md-contacts" :open="true">
        <template slot="link-text">NPC</template>

        <sidenav-router-link to="/npc/personal" :active="isMenuActive('/npc/personal')" :exact="true">Личные</sidenav-router-link>
        <sidenav-router-link to="/npc/general" :active="isMenuActive('/npc/general')" :exact="true">Общие</sidenav-router-link>
      </sidenav-menu>
      <sidenav-router-link icon="ion ion-ios-list-box" to="/tasks" :active="isMenuActive('/tasks')" :exact="true" :disabled="true">Задания</sidenav-router-link>
      <sidenav-router-link icon="ion ion-logo-freebsd-devil" to="/pets-constructor" :active="isMenuActive('/pets-constructor')" :exact="true" :disabled="true">Конструктор существ</sidenav-router-link>
    </div>
  </sidenav>
</template>

<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'
import { mapState } from 'vuex'
import { declOfNum } from '@/helpers.js'

export default {
  name: 'app-layout-sidenav',
  components: {
    /* eslint-disable vue/no-unused-components */
    Sidenav,
    SidenavLink,
    SidenavRouterLink,
    SidenavMenu,
    SidenavHeader,
    SidenavBlock,
    SidenavDivider
    /* eslint-enable vue/no-unused-components */
  },
  props: {
    orientation: {
      type: String,
      default: 'vertical'
    }
  },

  computed: {
    ...mapState({
      user: state => state.user
    }),

    balance () {
      return this.user.balance + ' ' + declOfNum(this.user.balance, ['лабрик', 'лабрика', 'лабриков'])
    }
  },

  watch: {
    $route () {
      if (this.layoutHelpers.isSmallScreen()) {
        this.layoutHelpers.setCollapsed(true)
      }
    }
  },

  mounted () {
    if (this.layoutHelpers.isSmallScreen()) {
      let clientX = null
      let clientY = null
      let xDiff = null
      let yDiff = null
      let isCollapsed = this.layoutHelpers.isCollapsed()
      let moves = 0
      let timeout = null

      const checkForSwipe = function () {
        if (xDiff >= 200 && isCollapsed) {
          this.layoutHelpers.setCollapsed(false)
        } else if (xDiff <= -150 && !isCollapsed) {
          this.layoutHelpers.setCollapsed(true)
        }

        xDiff = 0
        yDiff = 0
        timeout = null
      }

      document.addEventListener('touchstart', evt => {
        clientX = evt.touches[0].clientX
        clientY = evt.touches[0].clientY
      })

      document.addEventListener('touchmove', evt => {
        xDiff = evt.touches[0].clientX - clientX

        if (moves === 0 && !timeout) {
          yDiff = evt.touches[0].clientY - clientY

          if (Math.abs(xDiff) > Math.abs(yDiff) && xDiff !== 0) {
            timeout = setTimeout(checkForSwipe, 200)
          }

          moves++
        }
      })

      document.addEventListener('touchend', () => {
        clientX = 0
        clientY = 0
        moves = 0
      })

      this.layoutHelpers.on('toggle', () => 
        isCollapsed = this.layoutHelpers.isCollapsed()
      )

      const table = document.querySelector('.table-responsive')

      if (table) {
        table.addEventListener('touchmove', evt => evt.stopPropagation())
      }
    }
  },

  methods: {
    isMenuActive (url) {
      return this.$route.path.indexOf(url) === 0
    },
    isMenuOpen (url) {
      return this.$route.path.indexOf(url) === 0 && this.orientation !== 'horizontal'
    },
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    }
  }
}
</script>

<style>
.sidenav-vertical {
  max-width: 250px;
}

.sidenav-horizontal {
  border-bottom: 1px solid #262626;
}

.sidenav.layout-sidenav {
  background-color: #131315;
  border-right: 3px solid #00abc12d;
  color: #ffffff;
}

.sidenav a.sidenav-link {
  color: #e1e2e4;
}

.sidenav-item.active .sidenav-link:not(.sidenav-toggle),
.sidenav-item:not(.disabled) .sidenav-link:hover {
  background-color: #008797;
}

.sidenav a.sidenav-link {
  color: #ffffff;
}

.icon-size {
  font-size: 1.2rem;
}

.card-body.user-block {
  min-height: 230px;
}

.layout-collapsed:not(.layout-sidenav-hover) .user-block {
  width: 70px;
  padding: 0;
}

.layout-collapsed:not(.layout-sidenav-hover) .user-block > h5,
.layout-collapsed:not(.layout-sidenav-hover) .user-block > p {
  display: none;
}

.layout-collapsed:not(.layout-sidenav-hover) .user-block > .avatar {
  width: 45px;
}

.layout-sidenav-hover .user-block > .avatar,
.user-block .avatar {
  width: 100px;
}

.sidenav-item.disabled .sidenav-link {
  pointer-events: none;
  color: grey
}
</style>
