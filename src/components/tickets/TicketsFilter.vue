<template>
  <div class="card mb-3">
    <div class="card-body">
      <div class="row">

        <div class="col-sm-4 col-md-4 col-lg-2">
          <label class="form-label">Статус</label>
          <select class="custom-select custom-select-sm" id="status" v-model="status">
            <option v-for="option in statusOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
          </select>
        </div>

        <div class="col-sm-4 col-md-4 col-lg-2">
          <label class="form-label">Персонаж</label>
          <select class="custom-select custom-select-sm" id="status" v-model="characterId">
            <option v-for="option in charactersOptions" :key="option.value" :value="option.value">{{ option.text }}</option>
          </select>
        </div>
        
        <div class="col-sm-2 col-md-2 col-lg-2">
          <label class="form-label d-none d-md-block">&nbsp;</label>
          <button class="btn btn-secondary btn-sm btn-block" @click="applyFilter">Показать</button>
        </div>

        <div class="col-sm-2 col-md-2 col-lg-2">
          <label class="form-label d-none d-md-block">&nbsp;</label>
          <button class="btn btn-primary btn-sm btn-block" :disabled="!status && !characterId" @click="resetFilter">Сбросить</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { contentMixin } from '@/mixins/content'

export default {
  name: 'TicketsFilter',
  mixins: [contentMixin],
  props: {
    charactersOptions: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    status: null,
    characterId: null
  }),
  computed: {
    statusOptions () {
      const options = []

      for (let key in this.ticketStatus) {
        options.push({ value: key, text: this.ticketStatus[key] })
      }

      return options
    }
  },
  methods: {
    applyFilter () {
      this.$emit('filter', this.status, this.characterId)
    },

    resetFilter () {
      this.status = null
      this.characterId = null
      this.$emit('filter', this.status, this.characterId)
    }
  }
}
</script>
