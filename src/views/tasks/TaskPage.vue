<template>
  <div class="container-fluid">
    <h1 class="sr-only">{{ task.name }}</h1>

    <ol class="breadcrumb font-weight-bold h4 py-3 mb-4">
      <li class="breadcrumb-item">
        <router-link to="/tasks">Список заданий</router-link>
      </li>

      <li class="breadcrumb-item active">
        <span>{{ task.name }}</span>
      </li>
    </ol>

    <div class="row">
      <div class="col-lg-12 col-xl-8 col-xxl-9">
        <div class="card mb-4">
          <h6 class="card-header d-flex justify-content-between">Суть задания</h6>

          <div class="card-body" :class="{ 'card-borded' : task.requirements.length }">
            <div v-html="task.description" class="ticket-desc"></div>
          </div>

          <div class="card-body">
            <h5>Требования к результату</h5>

            <div v-for="(item, index) in task.requirements" :key="index" class="d-flex align-items-center mb-3">
              <span class="requirement-badge badge-primary mr-4">{{ index + 1 }}</span>
              <span class="text-primary">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6 col-xl-4 col-xxl-3">
        <div class="card mb-4">
          <h6 class="card-header">Детали задания</h6>

          <div class="list-group list-group-flush">
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Тип</span>
              <span>{{ task.type.name }}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Категория</span>
              <span>{{ task.project.name }}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Награда</span>
              <span class="text-primary">ሌ {{ reward }}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Срок выполнения</span>
              <span>{{ date }}</span>
            </div>

            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Создано</span>
              <Date class="text-right" :value="task.createdAt" />
            </div>

            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Обновлено</span>
              <Date class="text-right" :value="task.updatedAt" />
            </div>

            <div v-if="task.skills.length" class="list-group-item d-flex flex-column justify-content-between align-items-center">
              <span class="text-muted mb-2">Требования к исполнителю</span>
              <div class="text-center">
                <span v-for="skill in task.skills" :key="skill" class="badge badge-primary mr-2">{{ skill }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Date from '@/components/Date'
import { declOfNum } from '@/helpers'
import axios from 'axios'

export default {
  name: 'TaskPage',

  components: {
    Date
  },

  data: () => ({
    task: {
      type: {},
      project: {},
      reward: {},
      skills: [],
      requirements: []
    }
  }),

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get(`/tasks/${to.params.id}`)
    document.title = 'ЛК - ' + data.name

    next(vm => {
      vm.task = data
    })
  },

  computed: {
    reward () {
      const min = this.task.reward.min
      const max = this.task.reward.max
      const value = max > min ? min + '-' + max : min

      return value + declOfNum(max, [' лабрик', ' лабрика', ' лабриков'])
    },

    date () {
      return this.task.days !== -1 ? this.task.days + declOfNum(this.task.days, [' день', ' дня', ' дней']) : 'Вариативно'
    }
  }
}
</script>

<style>
.card-borded {
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}

.requirement-badge {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  font-size: 1.2rem;
  border-radius: 50%;
}
</style>
