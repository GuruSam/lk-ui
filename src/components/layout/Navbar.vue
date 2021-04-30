<template>
  <b-navbar toggleable="lg" variant="navbar-theme" class="layout-navbar align-items-lg-center">

    <span class="log mr-1">
      <b-img src="/images/logo.png" width="50" />
    </span>
    <b-navbar-brand class="font-weight-light" :class="{ 'separator' : !loggedIn }" to="/">ЛК игрока</b-navbar-brand>

    <b-navbar-nav class="align-items-lg-center mr-auto mr-lg-4" v-if="loggedIn">
      <a class="nav-item nav-link px-0 ml-2 ml-lg-0" href="javascript:void(0)" @click="toggleSidenav">
        <i class="ion ion-md-menu text-large align-middle" />
      </a>
    </b-navbar-nav>

    <b-navbar-toggle target="app-layout-navbar"></b-navbar-toggle>

    <b-collapse is-nav id="app-layout-navbar">
      <b-navbar-nav class="align-items-lg-center">
        <b-nav-item href="#">Сайт Лабиринта</b-nav-item>
        <b-nav-item href="#">Игра</b-nav-item>
        <b-nav-item href="#">Пограничье</b-nav-item>
        <b-nav-item href="#">ЛабStore</b-nav-item>
        <b-nav-item href="#">База знаний</b-nav-item>
      </b-navbar-nav>

      <b-navbar-nav class="align-items-lg-center ml-auto">
        <b-nav-item-dropdown v-if="loggedIn" :right="true" class="navbar-user">
          <template slot="button-content">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <span class="px-1 mr-lg-2 ml-2 ml-lg-0">Мой аккаунт</span>
            </span>
          </template>

            <b-dd-item><i class="ion ion-ios-person text-lightest"></i> &nbsp; Профиль на форуме</b-dd-item>
            <b-dd-divider />
            <b-dd-item @click="logout()"><i class="ion ion-ios-log-out text-danger"></i> &nbsp; Выход</b-dd-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import { authService } from '@/services'

export default {
  name: 'app-layout-navbar',
  props: {
    sidenavToggle: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn && state.user.isProducer
    })
  },
  methods: {
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },

    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },

    logout () {
      authService.userLogout()
    }
  }
}
</script>

<style>
.layout-navbar {
  background-image: linear-gradient(to right top, rgba(0, 172, 193, 0.5), rgba(0, 131, 143, 0.5)), url(https://store.playlabirint.ru/images/header_background.jpg);
  background-position: center left;
}
#app-layout-navbar .nav-link {
  color: #eff1f5;
}
#app-layout-navbar .nav-link:hover {
  color: #fff;
}
.separator {
  padding-right: 20px;
  border-right: 1px solid hsla(0,0%,100%,.2);
}
</style>
