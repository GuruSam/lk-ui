<template>
  <div>
    <DataLoader v-if="loading" />

    <observer v-else tag="form" ref="form">
      <FormInput v-model="name" id="name" type="text" label="Имя и фамилия" rules="required" />
      <FormInput v-model="role" id="role" type="text" label="Роль в игре" rules="required|max:30" />
      <FormTextarea v-model="info" id="info" rows="4" label="Дополнительная информация" rules="required">
        <small class="form-text text-muted">
          Все, что вы считаете нужным рассказать о прошлом и настоящем данного NPC. Здесь же необходимо указать связь с существующими персонажами, если она есть.
        </small>
      </FormTextarea>

      <div class="form-group position-relative">
        <label class="form-label" for="birthdate">Дата рождения</label>
        <Datepicker v-model="birthday" :bootstrapStyling="true" :inline="true" :language="ru" />
      </div>

      <div class="form-group position-relative mb-4">
        <label class="form-label" for="height">Рост</label>
        <validation rules="required" v-slot="{ errors }" :skipIfEmpty="false">
          <div class="input-group">
            <input class="form-control" :class="{'is-invalid' : errors.length}" id="height" type="text" v-model="growth">
            <div class="input-group-append">
              <span class="input-group-text">см</span>
            </div>
          </div>

          <div v-if="errors.length" class="invalid-tooltip d-block">{{ errors[0] }}</div>
        </validation>
      </div>

      <FormTextarea v-model="character" id="character" rows="2" label="Характер" rules="required">
        <small class="form-text text-muted">
          Перечислите основные черты характера через запятую. Например: добрый, общительный, отзывчивый. Рекомендуется не более 500 символов.
        </small>
      </FormTextarea>
      <FormInput v-model="signs" id="signs" type="text" label="Особые приметы" rules="required">
        <small class="form-text text-muted">
          Например: родимое пятно на левой половине лица.
        </small>
      </FormInput>
      <FormSelect v-model="physics" :options="physiqueOptions" label="Уровень физической подготовки" track-by="value" track-label="name" placeholder="Выберите уровень" rules="required" />
      <FormRadio v-model="isPrivate" :options="privateOptions" name="private" label="Уровень доступа" rules="required">
        <small class="form-text text-muted">
          Личные NPC доступны для игры только вам. За общих NPC, например, курьера или официанта, вы разрешаете играть другим продюсерам.
        </small>
      </FormRadio>

      <img v-if="loadedAvatarUrl" :src="loadedAvatarUrl" alt="Аватар персонажа." width="100" height="100">
      <FormFile v-model="avatar" label="Аватар" :rules="!loadedAvatarUrl ? 'required' : ''" ref="fileInput" @input="onAvatarInput" />
      <FormSelect v-model="magicClass" :options="classOptions" label="Тип" track-by="name" track-label="name" placeholder="Выберите тип" rules="required" />
      <MagicCalculator v-if="showMagic" :magicClass="magicClass.value" :magic="magic" ref="magicCalculator" />

      <span v-if="magicError" class="d-block text-danger mb-2">{{ magicError }}</span>
      <Button :loading="submit" @click.prevent="createNPC">Отправить заявку</Button>
    </observer>
  </div>
</template>

<style src="@/vendor/libs/vuejs-datepicker/vuejs-datepicker.scss" lang="scss"></style>

<script>
import Datepicker from 'vuejs-datepicker'
import MagicCalculator from '@/components/tickets/npc/MagicCalculator'
import FormInput from '@/components/form/FormInput'
import FormTextarea from '@/components/form/FormTextarea'
import FormSelect from '@/components/form/FormSelect'
import FormRadio from '@/components/form/FormRadio'
import FormFile from '@/components/form/FormFile'
import Button from '@/components/Button'
import DataLoader from '@/components/loaders/DataLoader'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ru } from 'vuejs-datepicker/dist/locale'
import dayjs from 'dayjs'
import axios from 'axios'

const CLASS_HUMAN = 1
const CLASS_GHOST = 6

export default {
  name: 'NpcForm',

  props: {
    formData: {
      type: Object,
      default: () => ({
        name: null,
        role: null,
        info: null,
        birthday: new Date(),
        growth: null,
        character: null,
        signs: null,
        physics: null,
        private: 0,
        magicClass: null,
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
    Button,
    DataLoader,
    'validation': ValidationProvider,
    'observer': ValidationObserver
  },

  data: function () {
    return {
      ...this.formData,
      loadedAvatarUrl: null,
      isPrivate: false,

      physiqueOptions: [],
      classOptions: [],
      privateOptions: [
        { value: false, name: 'Общий' }, 
        { value: true, name: 'Личный' }
      ],
      submit: false,
      loading: true,
      magicError: null,
      ru
    }
  },

  created() {
    // eslint-disable-next-line no-unused-vars
    this.fetchOptions()

    if (this.avatar) {
      this.loadedAvatarUrl = 'https://playlabirint.ru/' + this.avatar
      this.avatar = ''
    }
    this.isPrivate = this.private
  },

  computed: {
    showMagic () {
      return this.magicClass !== null && (this.magicClass.value !== CLASS_HUMAN && this.magicClass.value !== CLASS_GHOST)
    }
  },

  methods: {
    async fetchOptions () {
      this.loading = true
      const { data } = await axios.get('/npc/form')

      this.physiqueOptions = data.physics
      this.classOptions = data.magicClass
      this.magicClass = this.magicClass ? this.classOptions.find(option => option.value === this.magicClass) : null
      this.physics = this.physics ? this.physiqueOptions.find(option => option.value === this.physics) : null
      this.$emit('loaded', true)
      this.loading = false
    },

    getFormData () {
      return {
        name: this.name,
        role: this.role,
        info: this.info,
        birthday: dayjs(this.birthday).format('YYYY-MM-DD'),
        growth: Number(this.growth),
        character: this.character,
        signs: this.signs,
        physics: this.physics ? this.physics.value : null,
        private: this.isPrivate,
        magicClass: this.magicClass ? this.magicClass.value : null,
        magic: this.showMagic ? this.$refs.magicCalculator.getMagic() : null
      }
    },

    getReadableData () {
      const formData = this.getFormData()

      formData.physics = this.physique.name
      formData.class = this.npcClass.name
      formData.private = formData.private === 1 ? 'Личный' : 'Общий'

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

      if (formData.magic && formData.magic.levelPoints < 0) {
        this.magicError = 'Доступных баллов уровней не может быть меньше 0'
        
        return this.submit = false
      }

      const avatar = await this.uploadAvatar()
      if (avatar) {
        formData.avatarId = avatar.id
      }

      this.$emit('submit', formData)
    },

    async uploadAvatar () {
      const avatar = this.$refs.fileInput.getFile()
      
      if (avatar) {
        const formData = new FormData()
        formData.append('avatar', avatar)
        
        const { data } = await axios.post('/npc/avatar', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
          }
        })

        return data
      }

      return false
    },

    setSubmit (state) {
      this.submit = state
    },

    onAvatarInput (value) {
      if (value) {
        const avatar = this.$refs.fileInput.getFile()
        this.loadedAvatarUrl = URL.createObjectURL(avatar)
      }
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
