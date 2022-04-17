<template>
  <div class="container-fluid">
    <h1 class="font-weight-bold py-3 mb-4 h4">Создать NPC</h1>

    <div class="card mb-4">
      <div class="card-body">
        <NpcForm :physiqueOptions="physics" :classOptions="magicClass" />
      </div>
    </div>
  </div>
</template>

<script>
import NpcForm from '@/components/npc/NpcForm'
import axios from 'axios'

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
  }
}
</script>
