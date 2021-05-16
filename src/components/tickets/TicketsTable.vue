<template>
  <b-card no-body>
    <b-overlay :show="busy" spinner-variant="primary" bg-color="#121214">
      <div class="table-responsive">
        <b-table
          :items="tickets"
          :fields="fields"
          :striped="true"
          :per-page="perPage"
          :responsive="true"
          :show-empty="true"
          empty-text="Заявок нет"
          class="card-table">

          <template v-slot:cell(name)="data">
            <router-link class="text-white" :to="'/tickets/' + data.item.id">{{ data.item.name }}</router-link>
          </template>
          <template v-slot:cell(status)="data">
            <span class="badge" :class="getTicketStatusColor(data.item.status)">{{ ticketStatus[data.item.status] }}</span>
          </template>
          <template v-slot:cell(createdAt)="data">
            {{ getDate(data.item.createdAt) }}
          </template>
          <template v-slot:cell(updatedAt)="data">
            {{ getDate(data.item.updatedAt) }}
          </template>
        </b-table>

      </div>
    </b-overlay>
    <hr v-if="tickets.length" class="border-light m-0">
    <b-card-body v-if="tickets.length" class="pt-0 pb-3">
      <div class="row">
        <div class="col-sm text-sm-left text-center pt-3">
          <span class="text-muted">Страница {{ currentPage }} из {{ totalPages }}</span>
        </div>
        <div class="col-sm pt-3">
          <b-pagination class="justify-content-center justify-content-sm-end m-0"
            v-if="total"
            v-model="currentPage"
            :total-rows="total"
            :per-page="perPage"
            @input="setPage"
            size="sm" />
        </div>
      </div>
    </b-card-body>
  </b-card>
</template>

<script>
import { contentMixin } from '@/mixins/content'

export default {
  name: 'TicketsTable',
  mixins: [contentMixin],
  props: {
    busy: Boolean,
    tickets: Array,
    total: Number
  },
  data: () => ({
    fields: [
      { key: 'id', label: '#', thClass: 'text-nowrap text-primary', tdClass: 'align-middle py-3' },
      { key: 'name', label: 'Название', thClass: 'text-nowrap text-primary', thStyle: 'min-width: 300px', tdClass: 'align-middle py-3' },
      { key: 'status', label: 'Статус', thClass: 'text-nowrap text-primary', tdClass: 'align-middle py-3' },
      { key: 'character.name', label: 'Персонаж', thClass: 'text-nowrap text-primary', tdClass: 'align-middle py-3' },
      { key: 'category.name', label: 'Категория', thClass: 'text-nowrap text-primary', tdClass: 'align-middle py-3' },
      { key: 'createdAt', label: 'Создана', thClass: 'text-nowrap text-primary', tdClass: 'align-middle py-3' },
      { key: 'updatedAt', label: 'Обновлена', thClass: 'text-nowrap text-primary', tdClass: 'align-middle py-3' },
      { key: 'actions', label: ' ', thClass: 'text-nowrap text-primary', tdClass: 'text-nowrap align-middle text-center py-3' }
    ],
    currentPage: 1,
    perPage: 12
  }),
  computed: {
    totalPages () {
      return Math.ceil(this.total / this.perPage)
    }
  },
  methods: {
    setPage (page) {
      this.$emit('pagination', {
        offset: page * this.perPage - this.perPage
      })
    }
  }
}
</script>

<style>
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}
a:hover {
  text-decoration: underline;
}
.nav-item .nav-link.tabs-border { 
  border-top-color: #272729 !important;
}
</style>
