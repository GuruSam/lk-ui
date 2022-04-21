<template>
  <div class="card mb-4">
    <h6 class="card-header">Описание</h6>
    <div class="card-body">
      <div class="row mb-2" v-for="(value, key) in fieldsMap" :key="key">
        <span class="col-md-2 text-muted">{{ value + ':' }}</span>
        <span v-if="entity[key]" class="col-md-9">{{ entity[key] }}</span>
      </div>
    </div>

    <h6 v-if="entity.magic" class="card-header">Магия</h6>
    <div v-if="entity.magic" class="card-body">
      <div class="row mb-2">
        <span class="col-md-2">Ординар: {{ entity.magic.lvl }}</span>
      </div>

      <div class="row mb-2" v-for="skill in entity.magic.skills" :key="skill.id">
        <span class="col-md-2 text-muted">{{ skill.name }}</span>
        <span class="col-md-9">
          <img v-for="n in skill.lvl" :key="n" class="mr-1" src="/images/magic-point.png" />
        </span>
      </div>
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
    },

    fieldsMap: {
      'name': 'Имя',
      'role': 'Роль',
      'class': 'Класс',
      'birthday': 'День рождения',
      'growth': 'Рост',
      'character': 'Характер',
      'signs': 'Особые приметы',
      'information': 'Дополнительная информация',
      'physics': 'Уровень физической подготовки',
      'access': 'Уровень доступа'
    }
  }),

  computed: {
    entity() {
      const entity = { ...this.data }

      entity.access = entity.private ? 'Личный' : 'Общий'
      entity.physics = this.physicOptions[entity.physics]
      entity.class = this.classOptions[entity.type]

      return entity
    }
  }
}
</script>
