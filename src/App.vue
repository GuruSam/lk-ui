<template>
  <div id="app">
    <transition name="fade">
      <AppLoader v-if="showLoader" />
    </transition>
    <div v-if="appLoaded" class="layout-wrapper">
      <div class="layout-inner">
        <Navbar />

        <div class="layout-container">
          <Sidenav v-if="loggedIn" />

          <div class="layout-content">
            <section class="router-transitions flex-grow-1 container-p-y" :class="{ 'container-p-x' : !breakpoint.isXs }">
              <ErrorScreen v-if="appHasError" />
              <router-view v-else />
              <vue-progress-bar></vue-progress-bar>
            </section>
            <LabBackground />
            <!-- <app-layout-footer /> -->
          </div>
        </div>
      </div>
      <Notification />
      <div class="layout-overlay" @click="closeSidenav"></div>
    </div>
  </div>
</template>

<style src="@/vendor/styles/bootstrap-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/appwork-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/theme-corporate-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/colors-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/uikit.scss" lang="scss"></style>
<style src="@/vendor/style.scss" lang="scss"></style>

<script>
import Navbar from '@/components/layout/Navbar'
import Sidenav from '@/components/layout/Sidenav'
import AppLoader from '@/components/loaders/AppLoader'
import ErrorScreen from '@/views/ErrorScreen'
import Notification from '@/components/Notification'
import LabBackground from '@/components/LabBackground'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidenav,
    AppLoader,
    ErrorScreen,
    Notification,
    LabBackground
  },
  computed: {
    ...mapState({
      appLoaded: state => state.appLoaded,
      showLoader: state => state.showLoader,
      loggedIn: state => state.auth.loggedIn && state.user.isProducer
    }),
    appHasError() {
      return this.$store.getters.hasError
    }
  },

  created () {
    this.$router.beforeEach((to, from, next) => {
      this.$Progress.start()
      next()
    })

    this.$router.afterEach(() => {
      this.$Progress.finish()
    })
  },

  mounted () {
    this.layoutHelpers.init()
    this.layoutHelpers.update()
    this.layoutHelpers.setAutoUpdate(true)
  },

  beforeDestroy () {
    this.layoutHelpers.destroy()
  },

  methods: {
    closeSidenav () {
      this.layoutHelpers.setCollapsed(true)
    }
  }
}
</script>

<style>
body {
  background-color: #141414;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

#app .layout-inner .layout-container {
  padding-top: 66px !important;
}
</style>
