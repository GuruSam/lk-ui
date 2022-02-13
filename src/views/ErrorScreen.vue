<template>
  <b-container class="mt-4">
    <b-row>
      <b-col>
        <b-card class="text-center mb-4">
          <Ghost />
          <h1 v-if="errorCode" class="display-1 mt-4 mb-0">{{ errorCode }}</h1>
          <p class="card-title mb-4 lead">{{ errorMessage }}</p>
          <b-button variant="primary" to="/dashboard">Вернуться</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Ghost from '@/components/Ghost'

export default {
  name: 'error-screen',
  props: {
    code: {
      type: String,
      default: null
    },
    error: {
      type: String,
      default: null
    }
  },
  components: {
    Ghost
  },
  computed: {
    appError() {
      return this.$store.state.appError
    },

    errorCode () {
      return this.code || this.appError.code
    },

    errorMessage () {
      return this.error || this.appError.message
    }
  }
}
</script>

<style>
.error-code {
  margin-bottom: 0;
}
</style>
