<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col">
        <div class="card text-center mb-4">
          <div class="card-body">
            <Ghost />
            <h1 v-if="errorCode" class="display-1 mt-4 mb-0">{{ errorCode }}</h1>
            <p class="card-title mb-4 lead">{{ errorMessage }}</p>
            <router-link to="/dashboard" class="btn btn-primary">Вернуться</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
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
