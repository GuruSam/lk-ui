<template>
  <div id="app">
    <Loader v-if="appLoading" />
    <div v-else class="layout-wrapper layout-1">
      <div class="layout-inner">
        <Navbar />

        <div class="layout-container">
          <Sidenav v-if="loggedIn" />

          <div class="layout-content">
            <div class="router-transitions container-fluid flex-grow-1 container-p-y">
              <ErrorPage v-if="error" />
              <router-view v-else />
            </div>
            <div class="background-fade d-none d-lg-block">
              <div class="background-fade-image"></div>
            </div>
            <!-- <app-layout-footer /> -->
          </div>
        </div>
      </div>
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
import Loader from '@/components/Loader'
import ErrorPage from '@/views/ErrorPage'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidenav,
    Loader,
    ErrorPage
  },
  computed: {
    ...mapState({
      appLoading: state => state.appLoading,
      loggedIn: state => state.auth.loggedIn && state.user.isProducer,
      error: state => state.error
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
.background-fade {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: -1;
}

.background-fade-image {
  position: relative;
}

.background-fade-image::before {
  background-image: url(https://store.playlabirint.ru/images/page-background.jpg);
  height: calc(50vw);
  background-size: cover;
  background-position: 50% 0;
  background-repeat: no-repeat;
  content: '';
  display: block;
}

.background-fade-image::after {
  background-image: linear-gradient(to bottom, rgba(17, 17, 17, 0) 0, #111111 95%);
  height: 50%;
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
}
/* .layout-inner {
  padding: 0 120px 0 120px;
} */
</style>
