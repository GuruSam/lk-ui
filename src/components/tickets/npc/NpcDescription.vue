<template>
  <div class="card-body">
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Имя:</div>
      <div class="col-md-9">{{ this.data.name }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Роль:</div>
      <div class="col-md-9">{{ this.data.role }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Класс:</div>
      <div class="col-md-9">{{ magicClass }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">День рождения:</div>
      <div class="col-md-9">{{ this.data.birthday }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Рост:</div>
      <div class="col-md-9">{{ this.data.growth }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Характер:</div>
      <div class="col-md-9">{{ this.data.character }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Особые приметы:</div>
      <div class="col-md-9">{{ this.data.signs }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Дополнительная информация:</div>
      <div class="col-md-9">{{ this.data.information }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Уровень физической подготовки:</div>
      <div class="col-md-9">{{ physics }}</div>
    </div>
    <div class="row mb-2">
      <div class="col-md-2 text-muted">Уровень доступа:</div>
      <div class="col-md-9">{{ access }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NpcDescription',

  props: {
    data: Object
  },

  data: () => ({
    physicOptions: {
      1: 'Низкий',
      2: 'Средний',
      3: 'Высокий'
    },
    classOptions: {
      1: 'Человек',
      2: 'Маг',
      3: 'Вампир',
      4: 'Оборотень',
      5: 'Крылатый',
      6: 'Призрак'
    }
  }),

  computed: {
    access() {
      return this.data.private ? 'Личный' : 'Общий'
    },

    physics() {
      return this.physicOptions[this.data.physics]
    },

    magicClass() {
      return this.classOptions[this.data.type]
    }
  }
}
</script>
