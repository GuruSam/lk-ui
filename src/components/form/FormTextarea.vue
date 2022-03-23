<template>
  <validation :rules="rules" v-slot="{ errors }" :skipIfEmpty="false" slim>
    <div class="form-group position-relative mb-4">
      <label class="form-label" :for="id">{{ label }}</label>
      <textarea class="form-control" 
        :class="{'is-invalid' : errors.length}" 
        :rows="rows"
        :id="id"
        :value="value" 
        @input="$emit('input', $event.target.value)"
      ></textarea>

      <div v-if="errors.length" class="invalid-tooltip">{{ errors[0] }}</div>
      <slot></slot>
    </div>
  </validation>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormTextarea',

  props: {
    value: String,
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    id: String,
    rows: String,
    rules: {
      type: String,
      default: ''
    }
  },

  components: {
    'validation': ValidationProvider
  }
}
</script>
