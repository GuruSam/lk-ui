<template>
  <validation :rules="rules" v-slot="{ errors }" :skipIfEmpty="false" slim>
    <div class="form-group position-relative mb-4">
      <span class="form-label d-inline-block">{{ label }}</span>
      <label class="custom-file">
        <input class="custom-file-input"
          type="file" 
          accept=".jpg"
          :class="{'is-invalid' : errors.length}"   
          :value="value" 
          @change="onFileChange"
        >

        <span class="custom-file-label">{{ fileName }}</span>
      </label>

      <div v-if="errors.length" class="invalid-tooltip d-block">{{ errors[0] }}</div>
    </div>
  </validation>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormFile',

  props: {
    value: String,
    label: String,
    rules: {
      type: String,
      default: ''
    }
  },

  components: {
    'validation': ValidationProvider
  },

  data: () => ({
    file: null,
    fileName: null
  }),

  methods: {
    onFileChange (evt) {
      if (evt.target.files.length) {
        this.file = evt.target.files[0]
        this.fileName = evt.target.files[0].name
      }

      this.$emit('input', evt.target.value)
    },

    getFile () {
      return this.file
    }
  }
}
</script>

<style scoped>
.custom-file-label::after {
  content: 'Обзор' !important;
}
</style>
