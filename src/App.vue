<template>
  <div id="app">
    <div class="layout-wrapper layout-1">
      <div class="layout-inner">
        <Navbar />

        <div class="layout-container">
          <Sidenav />

          <div class="layout-content">
            <div class="router-transitions container-fluid flex-grow-1 container-p-y">
              <router-view />
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

export default {
  name: 'App',
  components: {
    Navbar,
    Sidenav
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
  background-color: #1a1a1b;
}
</style>
