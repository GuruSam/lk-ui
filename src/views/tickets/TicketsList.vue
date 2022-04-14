<template>
  <div class="container-fluid">
    <PageTitle title="Заявки" sub-title="Связь с организаторами">
      <router-link class="d-block btn btn-primary rounded-pill" to="/tickets/create">
        <span class="ion ion-md-add"></span>&nbsp; Создать заявку
      </router-link>
    </PageTitle>

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
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import TicketsFilter from '@/components/tickets/TicketsFilter'
import TicketsTable from '@/components/tickets/TicketsTable'
import { contentService } from '@/services'

export default {
  name: 'tickets',
  components: { PageTitle, TicketsFilter, TicketsTable },

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
