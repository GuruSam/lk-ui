<template>
  <div>
    <sidenav orientation="vertical" class="sidenav-vertical layout-sidenav">
      <div class="sidenav-inner">
        <div class="sidenav-horizontal">
          <div class="card bg-transparent">
            <div class="card-body text-center">
              <img src="https://thesims.cc/data/avatars/l/0/1.jpg" alt class="ui-w-100 rounded-circle mt-2 mb-3">
              <h5 class="mb-2">Gardolir</h5>
              <p class="text-muted small">150 лабриков</p>
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
        <sidenav-router-link icon="ion ion-ios-contacts" to="/characters" :exact="true">Мои персонажи</sidenav-router-link>
        <sidenav-router-link icon="ion ion-md-contacts" to="/npc" :exact="true">Мои NPC</sidenav-router-link>
        <sidenav-router-link icon="ion ion-ios-mail" to="/tickets" :exact="true">Мои заявки</sidenav-router-link>
        <sidenav-router-link icon="ion ion-ios-list-box" to="/tasks" :exact="true">Задания</sidenav-router-link>
        <sidenav-router-link icon="ion ion-logo-freebsd-devil" to="/pets-constructor" :exact="true">Конструктор существ</sidenav-router-link>
      </div>
    </sidenav>
  </div>
</template>

<script>
import { Sidenav, SidenavLink, SidenavRouterLink, SidenavMenu, SidenavHeader, SidenavBlock, SidenavDivider } from '@/vendor/libs/sidenav'

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
</style>
