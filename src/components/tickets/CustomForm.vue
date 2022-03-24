<template>
  <observer ref="form">
    <form>
      <FormInput v-model="name" id="name" label="Название" rules="required">
        <small class="form-text text-muted">
          Укажите кратко тему заявки
        </small>
      </FormInput>

      <FormSelect v-model="characterId" :options="characters" track-by="id" track-label="name" label="Персонаж" placeholder="Выберите персонажа">
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

      <button class="btn btn-primary" type="button" :disabled="submit" @click="submitForm">Отправить заявку</button>
    </form>
  </observer>
</template>

<script>
import FormInput from '@/components/form/FormInput'
import FormSelect from '@/components/form/FormSelect'
import { ValidationProvider, ValidationObserver } from 'vee-validate'

export default {
  name: 'CustomForm',

  components: {
    FormInput,
    FormSelect,
    'validation': ValidationProvider,
    'observer': ValidationObserver
  },

  props: {
    characters: {
      type: Array,
      default: () => []
    },
    formData: {
      type: Object,
      default: () => ({
        name: null,
        characterId: null,
        message: null
      })
    }
  },

  data: function () {
    return {
      ...this.formData,
      submit: false
    }
  },

  methods: {
    submitForm () {
      this.submit = true
      setTimeout(() => this.submit = false, 3000)

      this.$refs.form.validate()
        .then(success => {
          if (!success) return

          const formData = {
            name: this.name,
            characterId: this.characterId ? this.characterId.id : null,
            message: this.message
          }

          this.$emit('submit', formData)
        })
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
