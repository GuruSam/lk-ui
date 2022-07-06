<template>
  <observer tag="form" ref="form">
    <FormInput v-model="name" id="name" label="Название" rules="required">
      <small class="form-text text-muted">
        Укажите кратко тему заявки
      </small>
    </FormInput>

    <FormSelect v-model="character" :options="characters" track-by="id" track-label="name" label="Персонаж" placeholder="Выберите персонажа">
      <small class="form-text text-muted">
        Если заявка не относится к персонажу, оставьте поле пустым
      </small>
    </FormSelect>

    <div class="form-group position-relative">
      <label class="form-label">Суть заявки</label>
      <validation rules="required" v-slot="{ errors }" :skipIfEmpty="false">
        <quill-editor ref="editor" v-model="message" :disabled="submit" class="extended" />

        <!-- To validate quill-editor -->
        <input class="form-control" :class="{'is-invalid' : errors.length}" type="hidden" :value="message">
        <div v-if="errors.length" class="invalid-tooltip">{{ errors[0] }}</div>
      </validation>
    </div>

    <Button :loading="submit" @click.prevent="submitForm">Отправить заявку</Button>
  </observer>
</template>

<script>
import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import Button from '@/components/Button'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import axios from 'axios'

export default {
  name: 'CustomForm',

  components: {
    FormInput,
    FormSelect,
    Button,
    'validation': ValidationProvider,
    'observer': ValidationObserver
  },

  props: {
    formData: {
      type: Object,
      default: () => ({
        name: null,
        character: null,
        message: null
      })
    }
  },

  data: function () {
    return {
      characters: [],
      character: null,
      ...this.formData,
      submit: false
    }
  },

  created () {
    if (!this.characters.length) {
      this.fetchCharacters()
    }
  },

  methods: {
    async fetchCharacters () {
      const { data } = await axios.get('/tickets/form')
      this.characters = data.characters
      this.$emit('loaded', true)
    },

    submitForm () {
      this.setSubmit(true)

      this.$refs.form.validate()
        .then(success => {
          if (!success) {
            return this.setSubmit(false)
          }

          const formData = {
            name: this.name,
            characterId: this.character ? this.character.id : null,
            message: this.message
          }

          this.$emit('submit', formData)
        })
    },

    setSubmit (state) {
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