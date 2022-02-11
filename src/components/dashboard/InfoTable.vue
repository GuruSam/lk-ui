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
          <td>
            <span v-if="isTickets" class="badge" :class="getTicketStatusColor(el.status, true)">{{ ticketStatus[el.status] }}</span>
            <span v-if="isTasks" class="badge">{{ el.status }}</span>
          </td>
          <td>
            <Date :value="el.updatedAt" />
          </td>
          <td class="text-right">
            <router-link :to="'/tickets/' + el.id"><i class="ion ion-md-eye"></i></router-link>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td class="text-muted">
            <em>{{ empty }}</em>
          </td>
        </tr>
      </tbody>
      </table>
    </div>
    </div>
</template>

<script>
import Date from '@/components/Date'
import { contentMixin } from '@/mixins/content'

export default {
  name: 'InfoTable',
  mixins: [contentMixin],
  components: { Date },
  props: {
    title: String,
    data: {
      type: Array,
      default: () => []
    },
    type: String,
    empty: {
      type: String,
      default: 'Данных нет'
    }
  },
  computed: {
    isTickets () {
      return this.type === 'tickets'
    },

    isTasks () {
      return this.type === 'tasks'
    }
  }
}
</script>
