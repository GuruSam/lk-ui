<template>
  <sidenav orientation="vertical" class="sidenav-vertical layout-sidenav">
    <div class="sidenav-inner" :class="{ 'py-1': orientation !== 'horizontal' }">
      <sidenav-router-link icon="ion ion-md-speedometer" to="/dashboard" :active="isMenuActive('/dashboard')" :exact="true">Главная</sidenav-router-link>
      <sidenav-router-link icon="ion ion-md-desktop" to="/tickets" :exact="true">Обратная связь</sidenav-router-link>
      <sidenav-router-link icon="ion ion-md-desktop" to="/tasks" :exact="true">Система заданий</sidenav-router-link>
      <sidenav-router-link icon="ion ion-md-desktop" to="/characters" :exact="true">Персонажи</sidenav-router-link>
      <sidenav-router-link icon="ion ion-md-desktop" to="/pet-creator" :exact="true">Конструктор существ</sidenav-router-link>
    </div>
  </sidenav>
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
  /* border-right: 2px solid #145b61; */
}
.sidenav a.sidenav-link {
  color: #e1e2e4;
}
.sidenav-item.active, 
.sidenav-item:hover {
  background-color: #00acc170;
  color: #fff;
}
</style>
