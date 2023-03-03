<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
    <div class="card task-card mb-4">
      <div class="card-header task-header">{{ task.project.name }}</div>
      <div class="card-body">
        <router-link :to="'/tasks/' + task.id" class="text-white">
          <h4 class="card-title text-primary lead">{{ task.name }}</h4>
        </router-link>

        <div class="card-subtitle text-secondary mb-4 mt-3">
          <small class="mr-3 task-details">
            <span class="task-details__icon">ሌ</span>
            {{ reward }}
          </small>
          <small class="mr-3 task-details">
            <span class="ion ion-md-calendar task-details__icon mr-1"></span>
            {{ date }}
          </small>
          <small class="mr-3 task-details">
            <span class="ion ion-md-sync task-details__icon mr-1"></span>
            {{ task.type.name }}
          </small>
        </div>

        <p class="card-text">
          {{ description }}
        </p>
        <router-link :to="'/tasks/' + task.id" class="ml-1">Подробнее</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { declOfNum } from '@/helpers'

export default {
  name: 'TaskCard',

  props: {
    task: {
      type: Object,
      default: () => ({
        name: '',
        project: {},
        type: {},
        reward: {
          min: 0,
          max: 0
        },
        days: '',
      })
    }
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
    },

    description () {
      const el = document.createElement('div')
      el.innerHTML = this.task.description
      const description = el.textContent

      return description.length > 103 
        ? description.slice(0, 100) + '...' 
        : description
    }
  }
}
</script>

<style scoped>
/* .task-card {
  min-height: 270px;
} */

/* .task-header {
  background: linear-gradient(to bottom, rgba(0, 135, 151, 0.5), rgb(18 18 20));
  border-bottom: none;
} */

.task-badge {
  background-color: #027381;
}

.task-details {
  vertical-align: middle;
}

.task-details__icon {
  font-size: 0.9rem;
}
</style>
