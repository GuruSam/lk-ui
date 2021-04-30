<template>
  <div class="card mb-4">
    <div class="card-header text-large">
      {{ title }}
    </div>
    <div class="table-responsive">
      <table class="table card-table">
      <tbody v-if="data.length">
        <tr v-for="el in data" :key="el.id">
          <td>Согласование амулета</td>
          <td><span class="badge badge-outline-warning">Ждёт ответа ГМ</span></td>
          <td>01.04.2021 10:19</td>
          <td><a href="#"><i class="ion ion-md-eye"></i></a></td>
        </tr>
        <!-- <tr>
          <td>Согласование амулета</td>
          <td><span class="badge badge-outline-warning">Ждёт ответа ГМ</span></td>
          <td>01.04.2021 10:19</td>
          <td><a href="#"><i class="ion ion-md-eye"></i></a></td>
        </tr>
        <tr>
          <td>Заявка в игру Вася Пупкин</td>
          <td><span class="badge badge-outline-danger">Ждёт вашего ответа</span></td>
          <td>01.04.2021 10:19</td>
          <td><a href="#"><i class="ion ion-md-eye"></i></a></td>
        </tr> -->
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
    }
  }
}
</script>
