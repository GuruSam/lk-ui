<template>
  <div class="container-fluid">
    <page-title title="Продюсеры" sub-title="Ваши аккаунты на игровом форуме playlabirint.ru/game">
      <router-link class="d-block btn btn-primary rounded-pill" to="/tickets/create?category=17">
        <span class="ion ion-md-add"></span>&nbsp; Создать продюсера
      </router-link>
    </page-title>

    <div v-if="producers.length" class="row mt-3">
      <producer v-for="prod in producers" :key="prod.id" :producer="prod" @switched-to-main="onProducerUpdate" />
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
  },

  methods: {
    onProducerUpdate (producer) {
      const prevProd = this.producers.find(prod => prod.isMain)

      if (prevProd) {
        prevProd.isMain = false
      }

      producer.isMain = true
    }
  }
}
</script>

<style>
.producer-info {
  font-style: initial;
}
</style>
