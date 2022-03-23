<template>
  <validation :rules="rules" v-slot="{ errors }" :skipIfEmpty="false" slim>
    <div class="form-group position-relative mb-4">
      <span class="form-label mb-3 d-inline-block">{{ label }}</span>

      <div class="custom-controls-stacked">
        <label class="custom-control custom-radio" v-for="option in options" :key="option.value">
          <input class="custom-control-input"
            type="radio"
            :name="name" 
            :selected="value === option.value"
            :value="value"
            @input="$emit('input', option.value)"
          >
          <span class="custom-control-label">{{ option.name }}</span>
        </label>
      </div>

      <div v-if="errors.length" class="invalid-tooltip d-block">{{ errors[0] }}</div>
      <slot></slot>
    </div>
  </validation>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormRadio',

  props: {
    value: [String, Number],
    options: {
      type: Array,
      default: () => []
    },
    label: String,
    name: String,
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
