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
        select-label=""
        selected-label="Выбрано"
        deselect-label="Нажмите, чтобы отменить"
        @input="$emit('input', $event)"
      >
        <template slot="option" slot-scope="props">
          <div class="option__desc">
            <img v-if="showImage && props.option.avatar" class="option__image ui-w-30 rounded-circle mr-2" :src="props.option.avatar" :alt="props.option[trackLabel]">
            <span class="option__small">{{ trackLabel ? props.option[trackLabel] : props.option }}</span>
          </div>
        </template>
      
      </multiselect>

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
    },
    showImage: {
      type: Boolean,
      default: false
    }
  },

  components: {
    'validation': ValidationProvider,
    'multiselect': Multiselect
  }
}
</script>

<style>
.multiselect__option.multiselect__option--highlight::after {
  font-size: 12px;
}
</style>
