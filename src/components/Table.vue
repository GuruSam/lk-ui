<template>
  <div class="card mb-4">
    <div class="card-header text-large">
      {{ title }}
    </div>
    <div class="table-responsive">
      <table class="table card-table">
      <tbody v-if="data.length">
        <tr v-for="el in data" :key="el.id">
          <td>{{ el.name }}</td>
          <td><span class="badge" :class="getTicketStatusColor(el.status, true)">{{ getTicketStatus(el.status) }}</span></td>
          <td>{{ getDate(el.updatedAt) }}</td>
          <td class="text-right">
            <router-link :to="'/tickets/' + el.id"><i class="ion ion-md-eye"></i></router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-muted"><em>{{ getEmptyMessage() }}</em></td>
        </tr>
      </tbody>
      </table>
    </div>
    </div>
</template>

<script>
import { contentMixin } from '@/mixins/content'

export default {
  name: 'data-table',
  mixins: [contentMixin],
  props: {
    title: String,
    data: {
      type: Array,
      default: () => []
    },
    type: String
  },
  methods: {
    getEmptyMessage () {
      switch (this.type) {
        case 'tickets':
          return 'Активных заявок нет'
        case 'tasks':
          return 'Активных заданий нет'
      } 
    }
  }
}
</script>
