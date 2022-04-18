<template>
  <div class="mb-4 npc-header">
    <div class="media col-md-10 col-lg-8 col-xl-7 p-4 align-items-center">
      <img class="d-block ui-w-100 rounded-circle" :src="'https://playlabirint.ru' + data.avatar" alt="Аватар персонажа.">

      <div class="media-body ml-5">
        <h2 class="h4 font-weight-bold mb-2">{{ data.name }}</h2>
        <div class="text-big character-role mb-2">{{ data.role }}</div>
        <div class="text-big" :class="statusColor">{{ status }}</div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'NpcHeader',

  props: {
    data: Object
  },

  computed: {
    status() {
      switch (this.data.status) {
        case 0:
          return 'На утверждении'
        case 1:
          return 'Активен'
        case 2:
          return 'Отклонён'
      
        default:
          return 'Статус неизвестен'
      }
    },

    statusColor() {
      switch (this.data.status) {
        case 0:
          return 'text-primary'
        case 1:
          return 'text-success'
        case 2:
          return 'text-danger'
      
        default:
          return 'text-primary'
      }
    }
  }
}
</script>

<style scoped>
.npc-header {
  background-color: #121214;
  border-bottom: 2px solid #102e33;
}

.character-role {
  color: #4b939f;
  margin-bottom: 1.5rem;
}
</style>
