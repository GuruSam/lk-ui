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
          <td><span class="badge" :class="getStatusColor(el.status)">{{ getStatus(el.status) }}</span></td>
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
import dayjs from 'dayjs'

export default {
  name: 'data-table',
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
    },
    getDate (ts) {
      return dayjs.unix(ts).format('DD.MM.YYYY HH:mm')
    },
    getStatusColor (status) {
      switch (status) {
        case 1:
          return 'badge-outline-primary'
        case 2:
          return 'badge-outline-success'
        case 3:
          return 'badge-outline-warning'
        case 4:
          return 'badge-outline-danger'
        default:
          return 'badge-outline-secondary'
      }
    },
    getStatus (status) {
      switch (status) {
        case 1:
          return 'Создано'
        case 2:
          return 'В обработке'
        case 3:
          return 'Ждёт ответа ГМ'
        case 4: 
          return 'Ждёт вашего ответа'
      }
    }
  }
}
</script>
