<template>
  <div class="container-fluid">
    <h1 class="font-weight-bold py-3 mb-4 h4">Создать NPC</h1>

    <div class="card mb-4">
      <div class="card-body">
        <NpcForm :physiqueOptions="physics" :classOptions="magicClass" ref="form" @submit="createNPC" />
      </div>
    </div>
  </div>
</template>

<script>
import NpcForm from '@/components/npc/NpcForm'
import axios from 'axios'
import { getNPCMarkup } from '@/helpers'

export default {
  name: 'NpcCreate',

  components: { 
    NpcForm 
  },

  data: () => ({
    physics: [],
    magicClass: []
  }),

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get('/npc/form')

    next(vm => {
      vm.physics = data.physics
      vm.magicClass = data.class
    })
  },

  methods: {
    createNPC (formData) {
      const readableData = this.$refs.form.getReadableData()
      const ticket = {
        name: 'Заявка на NPC ' + formData.name,
        message: getNPCMarkup(readableData),
        categoryId: 14,
        data: formData
      }

      ticket.data.handler = 'npc'

      axios.post('/tickets', ticket)
        .then(ticket => this.$router.push(`/tickets/${ticket.data.id}`))
        .catch(() => this.$refs.form.setSubmitState(false))
    }
  }
}
</script>
