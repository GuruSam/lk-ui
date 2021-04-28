<template>
  <b-container class="mt-5">
    <b-row>
      <b-col>
        <b-card class="text-center mb-4">
          <Ghost />
          <p class="card-title mt-4 mb-4 lead">{{ error }}</p>
          <b-button variant="primary">Вернуться</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from 'vuex'
import Ghost from '@/components/Ghost'

export default {
  name: 'error-page',
  components: {
    Ghost
  },
  computed: {
    ...mapState({
      error: state => state.error
    })
  }
}
</script>

<style>
body {
  background-image: linear-gradient(to right top, rgba(14, 14, 14, 0.5), rgba(14, 14, 14, 0.5)), url(https://store.playlabirint.ru/images/page-background.jpg);
}
</style>
