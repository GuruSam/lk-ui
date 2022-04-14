<template>
  <div class="layout-wrapper layout-1">
    <div class="layout-inner">
      <Navbar />

      <div class="layout-container">
        <Sidenav v-if="loggedIn" />

        <div class="layout-content">
          <slot></slot>
          <vue-progress-bar></vue-progress-bar>
          <LabBackground />
          <AppFooter />
        </div>
      </div>
    </div>
    <Notification />
    <div class="layout-overlay" @click="closeSidenav"></div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar-2'
import Sidenav from '@/components/layout/Sidenav'
import AppFooter from '@/components/layout/AppFooter'
import Notification from '@/components/Notification'
import LabBackground from '@/components/LabBackground'

export default {
  name: 'AppLayout',
  components: {
    Navbar,
    Sidenav,
    AppFooter,
    Notification,
    LabBackground
  },

  computed: {
    loggedIn () {
      return this.$store.state.auth.loggedIn && this.$store.state.user.isProducer
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
