<template>
  <div>
    <sidenav orientation="vertical" class="sidenav-vertical layout-sidenav">
      <div class="sidenav-inner">
        <div class="sidenav-horizontal">
          <div class="card bg-transparent">
            <div class="card-body text-center user-block">
              <img :src="user.avatar" alt class="rounded-circle mt-2 mb-3 avatar">
              <h5 class="mb-2">{{ user.username }}</h5>
              <p class="text-muted small">{{ balance }}</p>
            </div>
            <div class="card-footer text-center p-0">
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
            </div>
          </div>
        </div>
        <sidenav-router-link icon="ion ion-md-speedometer" to="/dashboard" :active="isMenuActive('/dashboard')" :exact="true">Главная</sidenav-router-link>
        <sidenav-router-link icon="ion ion-ios-contacts" to="/characters" :active="isMenuActive('/characters')" :exact="true">Мои персонажи</sidenav-router-link>
        <sidenav-router-link icon="ion ion-md-contacts" to="/npc" :active="isMenuActive('/npc')" :exact="true">Мои NPC</sidenav-router-link>
        <sidenav-router-link icon="ion ion-ios-mail" to="/tickets" :active="isMenuActive('/tickets')" :exact="true">Мои заявки</sidenav-router-link>
        <sidenav-router-link icon="ion ion-ios-list-box" to="/tasks" :active="isMenuActive('/tasks')" :exact="true">Задания</sidenav-router-link>
        <sidenav-router-link icon="ion ion-logo-freebsd-devil" to="/pets-constructor" :active="isMenuActive('/pets-constructor')" :exact="true">Конструктор существ</sidenav-router-link>
      </div>
    </sidenav>
  </div>
</template>

<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'
import { mapState } from 'vuex'

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
      return this.user.balance + ' ' + this.declOfNum(this.user.balance, ['лабрик', 'лабрика', 'лабриков'])
    }

  },

  watch: {
    $route () {
      if (this.layoutHelpers.isSmallScreen()) {
        this.layoutHelpers.setCollapsed(true)
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
.sidenav.layout-sidenav {
  background-color: #131315;
  border-right: 3px solid #00abc12d;
  color: #ffffff;
  /* border-right: 2px solid #145b61; */
}
.sidenav a.sidenav-link {
  color: #e1e2e4;
}
.sidenav-item.active,
.sidenav-item:hover {
  background-color: #00acc1;
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
/* .user-block {
  background: linear-gradient(to right top, rgb(2 2 2 / 44%), rgb(10 16 16 / 47%)), url('/images/blur-background.jpg');
  background-size: cover;
} */
</style>
