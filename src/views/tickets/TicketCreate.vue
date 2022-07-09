<template>
  <section class="container-fluid">
    <h1 class="font-weight-bold py-3 mb-4 h4">Создать заявку</h1>

    <div class="card mb-4" ref="formContainer">
      <div class="card-body">
        <FormSelect v-model="category" :options="categories" track-by="id" track-label="name" label="Категория" placeholder="Выберите категорию">
          <small class="form-text text-muted">
            Выберите тему заявки. Если затрудняетесь отнести свой вопрос к существующим категориям, выберите 'другое'
          </small>
        </FormSelect>
      </div>
      
      <div class="card-body" v-if="form">
        <KeepAlive>
          <component :is="form" @submit="createTicket" ref="form" />
        </KeepAlive>
      </div>
    </div>
  </section>
</template>

<script>
import FormSelect from '@/components/form/FormSelect'
import NpcForm from '@/components/tickets/npc/NpcForm'
import CustomForm from '@/components/tickets/CustomForm'
import ProducerForm from '@/components/tickets/ProducerForm'

import { ticketService as ticket } from '@/services/ticket'
import axios from 'axios'

export default {
  name: 'TicketCreate',

  components: {
    FormSelect,
    NpcForm,
    CustomForm,
    ProducerForm
  },

  data: () => ({
    category: null,
    categories: [],
  }),

  computed: {
    handler () {
      return this.category ? this.category.handler : null
    },

    form () {
      return ticket.getForm(this.handler)
    }
  },

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get('/tickets/form')

    next(vm => {
      vm.categories = data.categories
    })
  },

  methods: {
    createTicket (formData) {
      const data = ticket.createRequestData(formData, this.handler, this.category.id)

      axios.post('/tickets', data)
        .then(ticket => this.$router.push(`/tickets/${ticket.data.id}`))
        .catch(() => this.$refs.form.setSubmit(false))
    }
  }
}
</script>

<style scoped>
.card-body:first-child {
  padding-bottom: 0.5rem !important;
}

.card-body:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
</style>
