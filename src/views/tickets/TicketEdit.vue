<template>
  <section class="container-fluid">
    <h1 class="font-weight-bold py-3 mb-4 h4">Редактировать заявку</h1>

    <div class="card mb-4" ref="formContainer">
      <div class="card-body">
        <component :is="formComponent" :form-data="formData" ref="form" @submit="updateTicket" />
      </div>
    </div>
  </section>
</template>

<script>
import NpcForm from '@/components/tickets/npc/NpcForm'
import CustomForm from '@/components/tickets/CustomForm'
import ProducerForm from '@/components/tickets/ProducerForm'
import { ticketService as ticket } from '@/services/ticket'
import axios from 'axios'

export default {
  name: 'TicketEdit',

  components: { NpcForm, CustomForm, ProducerForm },

  data: () => ({
    formData: {},
    formComponent: null,
    formOptions: {},
    handler: null
  }),

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get(`/tickets/${to.params.id}`)
    const handler = data.entity ? data.entity.handler : 'custom'
    
    next(vm => {
      vm.formData = data.entity ?? data
      vm.formComponent = ticket.getForm(handler)
      vm.handler = handler
    })
  },

  computed: {
    formProps () {
      const props = Object.assign({}, this.formOptions[this.handler])

      if (Object.keys(this.formData).length) {
        props.formData = this.formData
      }

      return props
    }
  },

  methods: {
    updateTicket (formData) {
      const data = ticket.createRequestData(formData, this.handler)
      const ticketId = this.$route.params.id

      axios.put(`/tickets/${ticketId}`, data)
        .then(() => this.$router.push(`/tickets/${ticketId}`))
        .catch(() => this.$refs.form.setSubmitState(false))
    }
  }
}
</script>
