<template>
  <div class="container-fluid">
    <page-title class="mb-0" title="Мои продюсеры" />

    <div class="alert alert-custom producer-info d-flex justify-content-between" role="alert">
      <p>
        Ваши аккаунты на игровом форуме <strong>playlabirint.ru/game</strong>. Все оповещения из ЛК будут приходить на аккаунт основного продюсера, выбрать которого вы можете в списке ниже.
      </p>
      <router-link to="/tickets/create?category=17" class="d-block btn btn-primary rounded-pill">
        <span class="ion ion-md-add"></span>&nbsp; Создать продюсера
      </router-link>
    </div>

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
