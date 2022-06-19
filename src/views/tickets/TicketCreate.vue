<template>
  <section class="container-fluid">
    <h1 class="font-weight-bold py-3 mb-4 h4">Создать заявку</h1>

    <div class="card mb-4" ref="formContainer">
      <div class="card-body">
        <FormSelect v-model="category" :options="categories" track-by="id" track-label="name" label="Категория" placeholder="Выберите категорию" @input="onCategoryChange">
          <small class="form-text text-muted">
            Выберите тему заявки. Если затрудняетесь отнести свой вопрос к существующим категориям, выберите 'другое'
          </small>
        </FormSelect>
      </div>

      <div class="card-body" v-if="category && category.id === 1">
        <ProducerForm />
      </div>
      
      <div class="card-body" v-if="selectedForm">
        <DataLoader v-if="formLoading" />
        <component v-else :is="selectedForm" v-bind="formProps" ref="form" @submit="createTicket" />
      </div>
    </div>
  </section>
</template>

<script>
import FormSelect from '@/components/form/FormSelect'
import DataLoader from '@/components/loaders/DataLoader'

import NpcForm from '@/components/tickets/npc/NpcForm'
import CustomForm from '@/components/tickets/CustomForm'
import ProducerForm from '@/components/tickets/ProducerForm'

import { ticketService as ticket } from '@/services/ticket'
import axios from 'axios'

export default {
  name: 'TicketCreate',

  components: {
    FormSelect,
    DataLoader,
    NpcForm,
    CustomForm,
    ProducerForm
  },

  data: () => ({
    formOptions: {},
    category: null,
    categories: [],
    formLoading: false
  }),

  computed: {
    handler () {
      return this.category ? this.category.handler : null
    },

    selectedForm () {
      return ticket.getForm(this.handler)
    },

    formProps () {
      return this.handler ? this.formOptions[this.handler] : {}
    }
  },

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get('/tickets/form')

    next(vm => {
      vm.formOptions['custom'] = data
      vm.categories = data.categories
    })
  },

  methods: {
    async onCategoryChange() {
      if (!this.formOptions[this.handler]) {
        this.formLoading = true
        const options = await ticket.getFormOptions(this.handler)

        this.formOptions[this.handler] = options
        this.formLoading = false
      }
    },

    createTicket (formData) {
      const data = ticket.createRequestData(formData, this.handler, this.category.id)

      axios.post('/tickets', data)
        .then(ticket => this.$router.push(`/tickets/${ticket.data.id}`))
        .catch(() => this.$refs.form.setSubmitState(false))
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
