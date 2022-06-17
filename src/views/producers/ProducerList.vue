<template>
  <div class="container-fluid">
    <page-title class="mb-0" title="Мои продюсеры" />

    <div class="alert alert-custom producer-info" role="alert">
      <p>
        Ваши аккаунты на игровом форуме <strong>playlabirint.ru/game</strong>.
      </p>
    </div>

    <div v-if="producers.length" class="row mt-3">
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'

export default {
  name: 'ProducerList',

  components: {
    'page-title': PageTitle
  },

  data: () => ({
    producers: []
  })
}
</script>

<style>
.producer-info {
  font-style: initial;
}
</style>
