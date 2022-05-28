<template>
  <nav class="navbar layout-navbar navbar-expand-lg align-items-lg-center bg-navbar-theme" id="layout-navbar">
    <span class="log mr-1">
      <img src="/images/logo.png" width="50" alt="Логотип Лабиринта.">
    </span>

    <router-link class="navbar-brand font-weight-light" :class="{ 'separator' : !loggedIn }" to="/dashboard">
      ЛК игрока
    </router-link>

    <span class="navbar-nav align-items-lg-center mr-auto mr-lg-4" v-if="loggedIn">
      <a class="nav-item nav-link px-0 ml-2 ml-lg-0" href="javascript:void(0)" @click="toggleSidenav">
        <i class="ion ion-md-menu text-large align-middle" />
      </a>
    </span>

    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#app-layout-navbar" @click="toggleNavbar">
      <span class="navbar-toggler-icon"></span>
    </button>

    <transition name="slide">
      <div class="navbar-collapse collapse show" id="app-layout-navbar" v-show="showNavbar">
        <ul class="navbar-nav align-items-lg-center">
          <li class="nav-item">
            <a class="nav-link" href="https://playlabirint.ru/" target="_self">Сайт Лабиринта</a>
          </li> 
          <li class="nav-item">
            <a class="nav-link" href="https://playlabirint.ru/game/" target="_self">Игра</a>
          </li> 
          <li class="nav-item">
            <a class="nav-link" href="https://thesims.cc/forums/pograniche.226/" target="_self">Пограничье</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://store.playlabirint.ru/" target="_self">ЛабStore</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://wiki.playlabirint.ru/Заглавная_страница" target="_self">База знаний</a>
          </li>
        </ul>

        <div class="nav-item dropdown navbar-user ml-auto" :class="{ 'show' : showDropdown }" @click.stop="onDropdownClick">
          <a class="nav-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown">
            <span class="d-inline-flex flex-lg-row-reverse align-items-center align-middle">
              <span class="px-1 mr-lg-2 ml-2 ml-lg-0">Мой аккаунт</span>
            </span>
          </a>

          <div class="dropdown-menu dropdown-menu-right" :class="{ 'show' : showDropdown }">
            <a href="javascript:void(0)" class="dropdown-item">
              <i class="ion ion-ios-person text-lightest"></i> &nbsp; Профиль на форуме
            </a>
            <div class="dropdown-divider"></div>
            <a href="javascript:void(0)" class="dropdown-item" @click="logout">
              <i class="ion ion-ios-log-out text-danger"></i> &nbsp; Выход
            </a>
          </div>
        </div>
      </div>
    </transition>
  </nav>
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
  data: () => ({
    showDropdown: false,
    showNavbar: false
  }),
  computed: {
    ...mapState({
      loggedIn: state => state.auth.loggedIn && state.user.isProducer
    })
  },
  created() {
    document.addEventListener('click', () => {
      if (this.showDropdown) this.showDropdown = false
    })
  },
  methods: {
    toggleSidenav () {
      this.layoutHelpers.toggleCollapsed()
    },

    toggleNavbar () {
      this.showNavbar = !this.showNavbar
    },

    getLayoutNavbarBg () {
      return this.layoutNavbarBg
    },

    logout () {
      authService.userLogout()
    },

    onDropdownClick () {
      this.showDropdown = !this.showDropdown
    }
  }
}
</script>

<style>
.layout-inner .layout-navbar {
  position: fixed;
  min-width: 100%;
  background-image: linear-gradient(to right top, rgba(0, 172, 193, 0.5), rgba(0, 131, 143, 0.5)), url(https://store.playlabirint.ru/images/header_background.jpg);
  background-position: center center;
  background-size: cover;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 20;
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

.slide-enter-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   transition-duration: 0.3s;
   transition-timing-function: ease-out;
}

.slide-enter-to, .slide-leave {
   max-height: 250px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}
</style>
