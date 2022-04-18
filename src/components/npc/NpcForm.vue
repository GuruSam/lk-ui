<template>
  <observer tag="form" ref="form">
    <FormInput v-model="name" id="name" type="text" label="Имя и фамилия" rules="required" />
    <FormInput v-model="role" id="role" type="text" label="Роль в игре" rules="required|max:30" />
    <FormTextarea v-model="info" id="info" rows="4" label="Дополнительная информация" rules="required">
      <small class="form-text text-muted">
        Все, что вы считаете нужным рассказать о прошлом и настоящем данного NPC. Здесь же необходимо указать связь с существующими персонажами, если она есть.
      </small>
    </FormTextarea>

    <div class="form-group position-relative">
      <label class="form-label" for="birthdate">Дата рождения</label>
      <Datepicker v-model="birthdate" :bootstrapStyling="true" :inline="true" :language="ru" />
    </div>

    <div class="form-group position-relative mb-4">
      <label class="form-label" for="height">Рост</label>
      <validation rules="required" v-slot="{ errors }" :skipIfEmpty="false">
        <div class="input-group">
          <input class="form-control" :class="{'is-invalid' : errors.length}" id="height" type="text" v-model="height">
          <div class="input-group-append">
            <span class="input-group-text">см</span>
          </div>
        </div>

        <div v-if="errors.length" class="invalid-tooltip d-block">{{ errors[0] }}</div>
      </validation>
    </div>

    <FormTextarea v-model="character" id="character" rows="2" label="Характер">
      <small class="form-text text-muted">
        Перечислите основные черты характера через запятую. Например: добрый, общительный, отзывчивый. Рекомендуется не более 500 символов.
      </small>
    </FormTextarea>
    <FormInput v-model="signs" id="signs" type="text" label="Особые приметы" rules="required">
      <small class="form-text text-muted">
        Например: родимое пятно на левой половине лица.
      </small>
    </FormInput>
    <FormSelect v-model="physique" :options="physiqueOptions" label="Уровень физической подготовки" track-by="value" track-label="name" placeholder="Выберите уровень" rules="required" />
    <FormRadio v-model="access" :options="accessOptions" name="access" label="Уровень доступа" rules="required">
      <small class="form-text text-muted">
        Личные NPC доступны для игры только вам. За общих NPC, например, курьера или официанта, вы разрешаете играть другим продюсерам.
      </small>
    </FormRadio>
    <FormFile v-model="avatar" label="Аватар" rules="required" ref="fileInput" />
    <FormSelect v-model="npcClass" :options="classOptions" label="Тип" track-by="name" track-label="name" placeholder="Выберите тип" rules="required" />
    <MagicCalculator v-if="showMagic" :magicClass="npcClass.value" ref="magicCalculator" />

    <span v-if="magicError" class="d-block text-danger mb-2">{{ magicError }}</span>
    <button class="btn btn-primary" type="button" :disabled="submit" @click="createNPC">Отправить заявку</button>
  </observer>
</template>

<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>

<script>
import Datepicker from 'vuejs-datepicker'
import MagicCalculator from '@/components/npc/MagicCalculator'
import FormInput from '@/components/form/FormInput'
import FormTextarea from '@/components/form/FormTextarea'
import FormSelect from '@/components/form/FormSelect'
import FormRadio from '@/components/form/FormRadio'
import FormFile from '@/components/form/FormFile'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ru } from 'vuejs-datepicker/dist/locale'
import dayjs from 'dayjs'
import axios from 'axios'

export default {
  name: 'NpcForm',

  props: {
    physiqueOptions: Array,
    classOptions: Array,
    formData: {
      type: Object,
      default: () => ({
        name: null,
        role: null,
        info: null,
        birthdate: new Date(),
        height: null,
        character: null,
        signs: null,
        physique: null,
        access: 0,
        npcClass: null,
        magic: {},
        avatar: null
      })
    }
  },

  components: {
    Datepicker,
    MagicCalculator,
    FormInput,
    FormTextarea,
    FormSelect,
    FormRadio,
    FormFile,
    'validation': ValidationProvider,
    'observer': ValidationObserver
  },

  data: function () {
    return {
      ...this.formData,

      accessOptions: [
        { value: 0, name: 'Общий' }, 
        { value: 1, name: 'Личный' }
      ],
      submit: false,
      magicError: null,
      ru
    }
  },

  computed: {
    showMagic () {
      return this.npcClass !== null && (this.npcClass.value !== 1 && this.npcClass.value !== 6)
    }
  },

  methods: {
    getFormData () {
      return {
        name: this.name,
        role: this.role,
        info: this.info,
        birthday: dayjs(this.birthdate).format('YYYY-MM-DD'),
        growth: Number(this.height),
        character: this.character,
        signs: this.signs,
        physics: this.physique ? this.physique.value : null,
        private: Boolean(this.access),
        class: this.npcClass ? this.npcClass.value : null,
        magic: this.showMagic ? this.$refs.magicCalculator.getMagic() : null
      }
    },

    getReadableData () {
      const formData = this.getFormData()

      formData.physics = this.physique.name
      formData.class = this.npcClass.name
      formData.access = formData.private ? 'Личный' : 'Общий'

      return formData
    },

    async createNPC () {
      this.submit = true
      this.magicError = null

      const success = await this.$refs.form.validate()

      if (!success) {
        const failer = document.querySelector('.form-control.is-invalid')
        this.submit = false

        return failer.scrollIntoView()
      }

      const formData = this.getFormData()

      if (formData.magic.levelPoints < 0) {
        this.magicError = 'Доступных баллов уровней не может быть меньше 0'
        
        return this.submit = false
      }

      const avatar = await this.uploadAvatar()
      formData.avatarId = avatar.id

      this.$emit('submit', formData)
    },

    async uploadAvatar () {
      const avatar = this.$refs.fileInput.getFile()
      const formData = new FormData()
      formData.append('avatar', avatar)
      
      const { data } = await axios.post('/npc/avatar', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
        }
      })

      return data
    },

    setSubmitState (state) {
      this.submit = state
    }
  }
}
</script>

<style>
.form-group {
  min-height: 70px;
}

.invalid-tooltip {
  top: initial !important;
}
</style>
