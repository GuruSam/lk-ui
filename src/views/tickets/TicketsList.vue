<template>
  <b-container fluid>
    <h3 class="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
      <div class="mr-2">Связь с организаторами</div>
      <b-btn variant="primary rounded-pill" class="d-block"><span class="ion ion-md-add"></span>&nbsp; Написать заявку</b-btn>
    </h3>
    <TicketsFilter :charactersOptions="characterOptions" @filter="applyFilter" />

    <b-tabs no-fade class="nav-tabs-top mb-4" active-nav-item-class="tabs-border" @activate-tab="applyType">
      <b-tab title="Активные" :active="filter.type === 'active'"></b-tab>
      <b-tab title="Завершенные" :active="filter.type === 'completed'"></b-tab>
      <TicketsTable 
        :busy="busy" 
        :tickets="tickets" 
        :total="total"
        @pagination="fetchData" 
      />
    </b-tabs>
  </b-container>
</template>

<script>
import TicketsFilter from '@/components/tickets/TicketsFilter'
import TicketsTable from '@/components/tickets/TicketsTable'
import { contentService } from '@/services'

export default {
  name: 'tickets',
  components: { TicketsFilter, TicketsTable },

  data: () => ({
    busy: false,
    tickets: [],
    total: 0,
    characterOptions: [],

    filter: {
      status: null,
      characterId: null,
      type: 'active'
    }
  }),

  beforeRouteEnter (to, from, next) {
    const type = to.query.type || 'active'

    contentService.getTicketsList({ type })
      .then(({ data }) => {
        next(vm => {
          vm.tickets = data.items
          vm.total = data.total
          vm.setCharacterOptions(data.filters.characters)
        })
      })
      .catch(() => next())
  },

  created () {
    if (this.$route.query.type) {
      this.filter.type = this.$route.query.type
    }
  },

  methods: {
    applyFilter (status, characterId) {
      this.filter.status = status
      this.filter.characterId = characterId
      this.fetchData()
    },
    applyType (newTabIndex) {
      this.filter.type = newTabIndex === 0 ? 'active' : 'completed'
      this.$router.push({ query: { type: this.filter.type } })
      this.fetchData()
    },
    fetchData (offset) {
      const params = offset ? Object.assign({}, this.filter, offset) : this.filter
      this.busy = true

      return contentService.getTicketsList(params)
        .then(({ data }) => {
          this.tickets = data.items
          this.total = data.total
          this.setCharacterOptions(data.filters.characters)
        })
        .finally(() => {
          this.busy = false
        })
    },
    setCharacterOptions (characters) {
      this.characterOptions = characters.map(char => {
        return {
          value: char.id,
          text: char.name
        }
      })
    }
  }
}
</script>
