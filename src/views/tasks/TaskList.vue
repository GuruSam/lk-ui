<template>
  <div class="container-fluid">
    <PageTitle class="mb-0" title="Список заданий" />

    <div class="alert alert-custom producer-info d-flex justify-content-between" role="alert">
      <p>Выполняйте задания и получайте лабрики, а затем покупайте на них редкие артефакты в Лабсторе. </p>
    </div>

    <div class="row">
      <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import TaskCard from '@/components/tasks/TaskCard'
import axios from 'axios'

export default {
  name: 'TaskList',

  components: {
    PageTitle,
    TaskCard
  },

  data: () => ({
    tasks: [],
    limit: 12,
    total: null,
  }),

  async beforeRouteEnter (to, from, next) {
    const params = { limit: 12, offset: 0 }
    const { data } = await axios.get('/tasks', { params })

    next(vm => {
      vm.tasks = data.items,
      vm.total = data.total
    })
  },

  methods: {
    async fetchData() {
      const params = { limit: this.limit, offset: this.tasks.length }
      const { data } = await axios.get('/tasks', { params })

      this.tasks = data.items
      this.total = data.total
    }
  }
}
</script>
