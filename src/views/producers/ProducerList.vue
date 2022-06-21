<template>
  <div class="container-fluid">
    <page-title class="mb-0" title="Мои продюсеры" />

    <div class="alert alert-custom producer-info" role="alert">
      <p>
        Ваши аккаунты на игровом форуме <strong>playlabirint.ru/game</strong>.
      </p>
    </div>

    <div v-if="producers.length" class="row mt-3">
      <producer v-for="prod in producers" :key="prod.id" :producer="prod" />
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import ProducerCard from '@/components/producers/ProducerCard'
import axios from 'axios'

export default {
  name: 'ProducerList',

  components: {
    'page-title': PageTitle,
    'producer': ProducerCard
  },

  data: () => ({
    producers: []
  }),

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get('/producers')
    
    next(vm => {
      vm.producers = data.items
    })
  }
}
</script>

<style>
.producer-info {
  font-style: initial;
}
</style>
