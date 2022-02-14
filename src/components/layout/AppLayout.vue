<template>
  <div class="layout-wrapper">
    <div class="layout-inner">
      <Navbar />

      <div class="layout-container">
        <Sidenav v-if="loggedIn" />

        <div class="layout-content">
          <slot></slot>
          <vue-progress-bar></vue-progress-bar>
          <LabBackground />
          <!-- <app-layout-footer /> -->
        </div>
      </div>
    </div>
    <Notification />
    <div class="layout-overlay" @click="closeSidenav"></div>
  </div>
</template>

<script>
import Navbar from '@/components/layout/Navbar'
import Sidenav from '@/components/layout/Sidenav'
import Notification from '@/components/Notification'
import LabBackground from '@/components/LabBackground'

export default {
  name: 'AppLayout',
  components: {
    Navbar,
    Sidenav,
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
