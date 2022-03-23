<template>
  <validator :rules="rules" v-slot="{ errors }" :skipIfEmpty="false" slim>
    <div class="form-group position-relative mb-4">
      <label class="form-label" :for="id">{{ label }}</label>
      <input class="form-control" 
        :class="{'is-invalid' : errors.length}" 
        :type="type" 
        :id="id" 
        :value="value" 
        @input="$emit('input', $event.target.value)"
      >

      <div v-if="errors.length" class="invalid-tooltip">{{ errors[0] }}</div>
      <slot></slot>
    </div>
  </validator>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormInput',

  props: {
    value: String,
    type: {
      type: String,
      default: 'text'
    },
    label: String,
    id: String,
    rules: {
      type: String,
      default: ''
    }
  },

  components: {
    'validator': ValidationProvider
  }
}
</script>
