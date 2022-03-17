<template>
  <form>
    <div class="form-group position-relative">
      <label class="form-label" for="name">Имя и фамилия</label>
      <input class="form-control" :class="{'is-invalid' : errors.name}" id="name" type="text" v-model="name">

      <div v-if="errors.name" class="invalid-tooltip">Это поле не может быть пустым.</div>
    </div>

    <div class="form-group position-relative">
      <label class="form-label" for="role">Роль в игре</label>
      <input class="form-control" :class="{'is-invalid' : errors.role}" id="role" type="text" v-model="role">

      <small class="form-text text-muted">
        Коротко роль в игре, например, брат Ивана Петрова. Не более 30 символов. Отображается в сообщениях. Магический класс не является ролью.
      </small>
    </div>

    <div class="form-group position-relative">
      <label class="form-label" for="info">Дополнительная информация</label>
      <textarea class="form-control" :class="{'is-invalid' : errors.info}" rows="4" v-model="info"></textarea>

      <small class="form-text text-muted">
        Все, что вы считаете нужным рассказать о прошлом и настоящем данного NPC. Здесь же необходимо указать связь с существующими персонажами, если она есть.
      </small>
    </div>

    <div class="form-group position-relative dark-style">
      <label class="form-label" for="birthdate">Дата рождения</label>
      <Datepicker v-model="birthdate" :bootstrapStyling="true" :inline="true" :language="ru" />
    </div>

    <div class="form-group position-relative">
      <label class="form-label" for="height">Рост</label>
      <div class="input-group">
        <input class="form-control" :class="{'is-invalid' : errors.height}" id="height" type="text" v-model="height">
        <div class="input-group-append">
          <span class="input-group-text">см</span>
        </div>
      </div>
    </div>

    <div class="form-group position-relative">
      <label class="form-label" for="character">Характер</label>
      <textarea class="form-control" :class="{'is-invalid' : errors.character}" rows="2" v-model="character"></textarea>

      <small class="form-text text-muted">
        Перечислите основные черты характера через запятую. Например: добрый, общительный, отзывчивый. Рекомендуется не более 500 символов.
      </small>
    </div>

    <div class="form-group position-relative">
      <label class="form-label" for="signs">Особые приметы</label>
      <input class="form-control" :class="{'is-invalid' : errors.signs}" id="signs" type="text" v-model="signs">

      <small class="form-text text-muted">
        Например: родимое пятно на левой половине лица.
      </small>
    </div>

    <div class="form-group position-relative dark-style">
      <label class="form-label">Уровень физической подготовки</label>
      <Multiselect v-model="physique" :options="physiqueOptions" track-by="name" label="name" placeholder="Выберите уровень" />
    </div>

    <div class="form-group position-relative dark-style">
      <span class="form-label mb-3 d-inline-block">Уровень доступа</span>

      <div class="custom-controls-stacked">
        <label class="custom-control custom-radio">
          <input class="custom-control-input" v-model="access" name="access" type="radio" value="Общий">
          <span class="custom-control-label">Общий</span>
        </label>
        <label class="custom-control custom-radio">
          <input class="custom-control-input" v-model="access" name="access" type="radio" value="Личный">
          <span class="custom-control-label">Личный</span>
        </label>
      </div>
    </div>

    <div class="form-group position-relative dark-style">
      <label class="form-label">Тип</label>
      <Multiselect v-model="npcClass" :options="classOptions" track-by="name" label="name" placeholder="Выберите тип" @input="classSelectHandler" />
    </div>

    <MagicCalculator v-if="showMagic" :magicClass="npcClass.value" />
  </form>
</template>

<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<script>
import Datepicker from 'vuejs-datepicker'
import Multiselect from 'vue-multiselect'
import MagicCalculator from '@/components/npc/MagicCalculator'
import { ru } from 'vuejs-datepicker/dist/locale'

export default {
  name: 'NpcForm',

  props: {
    physiqueOptions: Array,
    classOptions: Array
  },

  components: {
    Datepicker,
    Multiselect,
    MagicCalculator
  },

  data: () => ({
    name: null,
    role: null,
    info: null,
    birthdate: new Date(),
    height: null,
    character: null,
    signs: null,
    physique: null,
    access: null,
    npcClass: null,

    errors: {},
    showMagic: false,
    ru
  }),

  computed: {
    isHuman () {
      return this.npcClass !== null && this.npcClass.value === 1
    }
  },

  methods: {
    classSelectHandler () {
      this.showMagic = this.isHuman ? false : true
    }
  }
}
</script>
