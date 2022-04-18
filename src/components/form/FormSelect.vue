<template>
  <validation :rules="rules" v-slot="{ errors }" :skipIfEmpty="false" slim>
    <div class="form-group position-relative mb-4">
      <label class="form-label">{{ label }}</label>
      <multiselect
        :class="{'is-invalid' : errors.length}"
        :options="options"
        :track-by="trackBy"
        :label="trackLabel"
        :placeholder="placeholder"
        :value="value"
        :searchable="searchable"
        @input="$emit('input', $event)"
      ></multiselect>

      <div v-if="errors.length" class="invalid-tooltip">{{ errors[0] }}</div>
      <slot></slot>
    </div>
  </validation>
</template>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="@/vendor/libs/vue-multiselect/vue-multiselect.scss" lang="scss"></style>

<script>
import Multiselect from 'vue-multiselect'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FormSelect',

  props: {
    value: [String, Object, Number],
    options: {
      type: Array,
      default: () => []
    },
    trackBy: {
      type: String,
      default: ''
    },
    trackLabel: {
      type: String,
      default: ''
    },
    placeholder: String,
    label: String,
    searchable: {
      type: Boolean,
      default: false
    },
    rules: {
      type: String,
      default: ''
    }
  },

  components: {
    'validation': ValidationProvider,
    'multiselect': Multiselect
  }
}
</script>
