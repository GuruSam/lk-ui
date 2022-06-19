<template>
  <validation :rules="rules" v-slot="{ errors }" :skipIfEmpty="false" slim>
    <div class="form-group position-relative mb-4">
      <span class="form-label mb-3 d-inline-block">{{ label }}</span>

      <div class="custom-controls-stacked">
        <label class="custom-control custom-checkbox" v-for="option in legalOptions" :key="option.value">
          <input class="custom-control-input"
            type="checkbox"
            :checked="value.includes(option)"
            :value="option.value"
            @input="onInput"
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
  name: 'FormCheckbox',

  props: {
    value: [Array, String, Boolean, Number],
    options: [Array],
    label: String,
    rules: {
      type: String,
      default: ''
    }
  },

  data: () => ({
    values: []
  }),

  components: {
    'validation': ValidationProvider
  },

  computed: {
    legalOptions () {
      return this.options.map(option => 
        typeof option === 'string' ? { name: option, value: option } : option
      )
    }
  },

  methods: {
    onInput (evt) {
      const values = [...this.value]

      if (evt.target.checked) {
        values.push(this.option)
      } else {
        const index = values.indexOf(this.option)

        if (index !== -1) {
          values.splice(index, 1)
        }
      }

      this.$emit('input', values)
    }
   }
}
</script>
