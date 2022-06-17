<template>
  <div id="smartwizard-4" class="smartwizard-vertical-left smartwizard-example sw-main sw-theme-default">
    <ul class="nav nav-tabs step-anchor">
      <li v-for="(step, index) in steps" :key="step.title" class="nav-item" :class="index === activeStep ? 'active' : 'done'" @click="activeStep = index">
        <a href="#" class="text-nowrap mb-3 nav-link">
          <span class="sw-done-icon ion ion-md-checkmark"></span>
          <span class="sw-icon ion" :class="step.icon"></span>
          <div class="text-muted small">{{ index > 0 ? `${index}-Й ШАГ` : null }}</div>
          {{ step.title }}
        </a>
      </li>
    </ul>

    <div class="sw-container tab-content">
      <div v-if="activeStep === 0" class="animated fadeIn mb-3 p-3">
        Давайте знакомиться. Расскажите немного о себе.

        <FormRadio v-model="experience" :options="expOptions" label="Ваш опыт в текстовых ролевых играх:" class="mt-4" />
        <FormRadio v-model="pace" :options="paceOptions" label="Какой темп игры вам ближе:" class="mt-4" />
        <FormRadio v-model="playtime" :options="playtimeOptions" label="В какое время вам удобнее всего играть, ориентируясь на московское:" class="mt-4" />
        <FormRadio v-model="playstyle" :options="playstyleOptions" label="Какой стиль игры вы предпочитаете:" class="mt-4" />
        <FormCheckbox v-model="genre" option="Ужасы" label="Какая тематика вам больше нравится:" />
      </div>

      <div class="btn-toolbar sw-toolbar sw-toolbar-bottom justify-content-end">
        <div class="btn-group mr-2 sw-btn-group" role="group">
          <button class="btn btn-primary sw-btn-prev" :disabled="activeStep === 0" type="button" @click="prevStep">Назад</button>
          <button class="btn btn-primary sw-btn-next" type="button" @click="nextStep">Вперёд</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormRadio from '@/components/form/FormRadio'
import FormCheckbox from '@/components/form/FormCheckbox'

const allSteps = [
  { title: 'Анкета продюсера', icon: 'ion-ios-keypad' },
  { title: 'Внешность', icon: 'ion-ios-keypad' },
  { title: 'Пол', icon: 'ion-ios-keypad' }
]

const expOptions = ['Нет опыта', 'Пробовал(а) немного', '1-3 года', 'Больше 3 лет']
const paceOptions = ['5 и более постов в день', '3-5 постов в день', '1-2 поста в день', '1 пост раз в 2-3 дня', '1 пост в неделю']
const playtimeOptions = ['Будни утром', 'Будни в течение дня', 'Будни вечером', 'Выходные']
const playstyleOptions = [
  'Свободная игра с другими персонажами, чем их больше, тем лучше. Вы не планируете ничего и знакомитесь со всеми подряд.',
  'Сюжетная игра с другими персонажами, чем их больше, тем лучше. Вы планируете какие-либо сюжеты и втягиваете в них всех желающих.',
  'Свободная игра с ограниченным кругом персонажей. Вы планируете завести несколько знакомых и играть с ними спонтанные сюжеты.',
  'Сюжетны игра с ограниченным кругом персонажей. Вы планируете играть свой сюжет, привлекая в него лишь несколько персонажей.',
  'Преимущественно соло-игра. Вы планируете развивать своего персонажа самостоятельно в своих постах, но не исключаете пересечение с другими.'
]

export default {
  name: 'GuestForm',

  components: {
    FormRadio, FormCheckbox
  },

  data: () => ({
    allSteps,
    steps: [allSteps[0]],
    activeStep: 0,

    experience: null,
    expOptions,

    pace: null,
    paceOptions,

    playtime: null,
    playtimeOptions,

    playstyle: null,
    playstyleOptions,

    genre: []
  }),

  methods: {
    nextStep () {
      const steps = this.steps
      const allSteps = this.allSteps
      const nextStep = this.activeStep + 1

      if (steps.length < allSteps.length && steps.length === nextStep) {
        steps.push(allSteps[nextStep])
      }

      if (nextStep < allSteps.length) {
        this.activeStep = nextStep
      }
    },

    prevStep () {
      if (this.activeStep > 0) {
        this.activeStep--
      }
    }
  }
}
</script>

<style src="@/vendor/libs/smartwizard/smartwizard.css"></style>

<style>
.sw-theme-default .step-anchor>li.active>a .sw-icon {
  color: #3cbfc7;
  border-color: #3cbfc7;
}

.sw-container .form-label,
.sw-container .custom-control-label {
  font-weight: 300;
  font-size: 0.95em;
}
</style>
