<template>
  <div id="app">
    <transition name="fade">
      <AppLoader v-if="showLoader" />
    </transition>

    <AppLayout v-if="appLoaded">
      <section class="router-transitions flex-grow-1 container-p-y" :class="{ 'container-p-x' : !breakpoint.isXs }">
        <ErrorScreen v-if="appHasError" />
        <router-view v-else />
      </section>
    </AppLayout>
  </div>
</template>

<style src="@/vendor/styles/bootstrap-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/appwork-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/theme-corporate-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/colors-dark.scss" lang="scss"></style>
<style src="@/vendor/styles/uikit.scss" lang="scss"></style>
<style src="@/vendor/style.scss" lang="scss"></style>

<script>
import AppLoader from '@/components/loaders/AppLoader'
import ErrorScreen from '@/views/ErrorScreen'
import AppLayout from '@/components/layout/AppLayout'
import { mapState } from 'vuex'

export default {
  name: 'App',
  components: {
    AppLayout,
    AppLoader,
    ErrorScreen
  },
  computed: {
    ...mapState({
      appLoaded: state => state.appLoaded,
      showLoader: state => state.showLoader
    }),

    appHasError() {
      return this.$store.getters.hasError
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
