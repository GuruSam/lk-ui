<template>
  <b-container fluid>
    <h3 class="d-flex justify-content-between align-items-center w-100 font-weight-bold py-3 mb-4">
      <div class="mr-2">Связь с организаторами</div>
      <b-btn variant="primary rounded-pill" class="d-block"><span class="ion ion-md-add"></span>&nbsp; Написать заявку</b-btn>
    </h3>

    <b-card class="mb-3">
      <b-row>
        <b-col lg="2" md="4" sm="4">
          <label class="form-label">Статус</label>
          <b-select v-model="filterStatus" size="sm" :options="filterOptions" />
        </b-col>
        <b-col lg="2" md="4" sm="4">
          <label class="form-label">Персонаж</label>
          <b-select v-model="filterStatus" size="sm" :options="filterOptions" />
        </b-col>

        <b-col lg="2" md="2" sm="2">
          <label class="form-label d-none d-md-block">&nbsp;</label>
          <b-btn variant="secondary" size="sm" :block="true" @click="applyFilter">Показать</b-btn>
        </b-col>
        <b-col lg="2" md="2" sm="2">
          <label class="form-label d-none d-md-block">&nbsp;</label>
          <b-btn variant="primary" size="sm" :disabled="!filterStatus" :block="true" @click="resetFilter">Сбросить</b-btn>
        </b-col>
      </b-row>
    </b-card>

    <b-card no-body>
      <div class="table-responsive">

        <b-table
          :items="tickets"
          :fields="fields"
          :striped="true"
          :current-page="currentPage"
          :per-page="perPage"
          :responsive="true"
          :show-empty="true"
          :busy="busy"
          empty-text="У вас еще нет заявок"
          class="card-table">

          <template v-slot:cell(name)="data">
            <router-link class="text-white" :to="'/tickets/' + data.item.id">{{ data.item.name }}</router-link>
          </template>
          
          <template v-slot:cell(status)="data">
            <span class="badge" :class="getTicketStatusColor(data.item.status)">{{ getTicketStatus(data.item.status) }}</span>
          </template>

          <template v-slot:cell(updatedAt)="data">
            {{ getDate(data.item.updatedAt) }}
          </template>
        </b-table>

      </div>
      <hr v-if="tickets.length" class="border-light m-0">
      <b-card-body v-if="tickets.length" class="pt-0 pb-3">
        <div class="row">
          <div class="col-sm text-sm-left text-center pt-3">
            <span class="text-muted">Страница {{ currentPage }} из {{ totalPages }}</span>
          </div>
          <div class="col-sm pt-3">
            <b-pagination class="justify-content-center justify-content-sm-end m-0"
              v-if="totalTickets"
              v-model="currentPage"
              :total-rows="totalTickets"
              :per-page="perPage"
              size="sm" />
          </div>
        </div>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { contentService } from '@/services'
import { contentMixin } from '@/mixins/content'

export default {
  name: 'tickets',
  mixins: [contentMixin],
  data: () => ({
    fields: [
      { key: 'id', label: '#', thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'name', label: 'Название', thClass: 'text-nowrap', thStyle: 'min-width: 300px', tdClass: 'align-middle py-3' },
      { key: 'status', label: 'Статус', thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'character.name', label: 'Персонаж', thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'created_at', label: 'Создана', thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'updatedAt', label: 'Обновлена', thClass: 'text-nowrap', tdClass: 'align-middle py-3' },
      { key: 'actions', label: ' ', thClass: 'text-nowrap', tdClass: 'text-nowrap align-middle text-center py-3' }
    ],

    filterOptions: [
      { value: 1, text: 'Создано' },
      { value: 2, text: 'В обработке' },
      { value: 3, text: 'Ждёт ответа ГМ' },
      { value: 4, text: 'Ждёт вашего ответа' },
      { value: 5, text: 'Завершено' },
      { value: 100, text: 'В архиве' }
    ],
    filterStatus: null,

    busy: false,
    tickets: [],
    totalTickets: 0,
    currentPage: 1,
    perPage: 15
  }),
  computed: {
    totalPages () {
      return Math.ceil(this.totalTickets / this.perPage)
    }
  },
  beforeRouteEnter (to, from, next) {
    contentService.getTicketsList({ type: 'all' })
      .then(({ data }) => {
        next(vm => {
          vm.tickets = data.items
          vm.totalTickets = data.total
        })
      })
      .catch(() => next())
  },
  beforeRouteUpdate (to, from, next) {
    this.tickets = []
    this.fetchData({ type: 'all' })
      .finally(() => next())
  },
  methods: {
    fetchData (params) {
      return contentService.getTicketsList(params)
        .then(({ data }) => {
          this.tickets = data.items
          this.totalTickets = data.total
        })
    },

    applyFilter () {
      this.busy = true

      this.fetchData({ status: this.filterStatus })
        .finally(() => this.busy = false)
    },
    resetFilter () {
      this.busy = true
      this.filterStatus = null

      this.fetchData({ type: 'all' })
        .finally(() => this.busy = false)
    }
  }
}
</script>

<style scoped>
table.b-table[aria-busy='true'] {
  opacity: 0.6;
}
a:hover {
  text-decoration: underline;
}
</style>
