<template>
  <b-card class="mb-3">
    <b-row>
      <b-col lg="2" md="4" sm="4">
        <label class="form-label">Статус</label>
        <b-select v-model="status" size="sm" :options="statusOptions" />
      </b-col>
      <b-col lg="2" md="4" sm="4">
        <label class="form-label">Персонаж</label>
        <b-select v-model="characterId" size="sm" :options="charactersOptions" />
      </b-col>

      <b-col lg="2" md="2" sm="2">
        <label class="form-label d-none d-md-block">&nbsp;</label>
        <b-btn variant="secondary" size="sm" :block="true" @click="applyFilter">Показать</b-btn>
      </b-col>
      <b-col lg="2" md="2" sm="2">
        <label class="form-label d-none d-md-block">&nbsp;</label>
        <b-btn variant="primary" size="sm" :disabled="!status && !characterId" :block="true" @click="resetFilter">Сбросить</b-btn>
      </b-col>
    </b-row>
  </b-card>
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
