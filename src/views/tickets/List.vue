<template>
  <b-container fluid>
    <h3 class="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
      <div class="mr-2">Связь с организаторами</div>
      <b-btn variant="primary rounded-pill" class="d-block"><span class="ion ion-md-add"></span>&nbsp; Написать заявку</b-btn>
    </h3>
    <TicketFilter 
      :charactersOptions="characterOptions" 
      :status="filterStatus" 
      :characterId="filterCharacter"
      @filter="applyFilter" 
    />

    <b-tabs no-fade class="nav-tabs-top mb-4" active-nav-item-class="tabs-border" @activate-tab="applyType">
      <b-tab title="Активные" active></b-tab>
      <b-tab title="Завершенные"></b-tab>
      <TicketTable :busy="busy" :tickets="tickets" :total="total" />
    </b-tabs>
  </b-container>
</template>

<script>
import TicketFilter from '@/components/tickets/Filter'
import TicketTable from '@/components/tickets/Table'
import { contentService } from '@/services'

export default {
  name: 'tickets',
  components: { TicketFilter, TicketTable },
  data: () => ({
    busy: false,
    tickets: [],
    total: 0,
    characterOptions: [],

    filterStatus: null,
    filterCharacter: null,
    filterType: 'active'
  }),
  beforeRouteEnter (to, from, next) {
    contentService.getTicketsList({ type: 'active' })
      .then(({ data }) => {
        next(vm => {
          vm.tickets = data.items
          vm.total = data.total
          vm.setCharacterOptions(data.items)
        })
      })
      .catch(() => next())
  },
  methods: {
    applyFilter (status, characterId) {
      this.filterStatus = status
      this.filterCharacter = characterId
      this.fetchData()
    },
    applyType (newTabIndex) {
      this.filterType = newTabIndex === 0 ? 'active' : 'completed'
      this.fetchData()
    },
    fetchData () {
      const params = {
        status: this.filterStatus,
        characterId: this.filterCharacter,
        type: this.filterType
      }
      this.busy = true

      return contentService.getTicketsList(params)
        .then(({ data }) => {
          this.tickets = data.items
          this.total = data.total
        })
        .finally(() => {
          this.busy = false
        })
    },
    setCharacterOptions (tickets) {
      this.characterOptions = tickets.map(ticket => {
        return {
          value: ticket.character.id,
          text: ticket.character.name
        }
      })
    }
  }
}
</script>
