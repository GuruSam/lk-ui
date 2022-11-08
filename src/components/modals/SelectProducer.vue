<template>
  <b-modal 
    :title="title" 
    :hide-footer="loading"
    :ok-disabled="!hasProducers"
    :busy="busy"
    id="default-modal"
    ref="modal" 
    ok-title="Сохранить" 
    cancel-title="Закрыть" 
    @hidden="$emit('hidden')"
    @ok="onSubmit"
    centered 
    visible
  >

    <DataLoader v-if="loading" />
    <div v-else>
      <FormSelect v-if="hasProducers" v-model="newProducer" :options="options" track-by="id" track-label="username" placeholder="Выберите продюсера" />
      <p v-else>Кажется, у вас еще нет ни одного продюсера. Чтобы создать продюсера, напишите <router-link to="/tickets/create">заявку</router-link> организаторам, выбрав категорию "Новый продюсер".</p>
    </div>
  </b-modal>
</template>

<script>
import FormSelect from '@/components/form/FormSelect'
import DataLoader from '@/components/loaders/DataLoader'
import axios from 'axios'

export default {
  name: 'SelectProducer',

  components: { FormSelect, DataLoader },

  props: {
    character: Object,
    producer: {
      type: Object,
      default: () => {}
    }
  },

  data: () => ({
    newProducer: null,
    loading: true,
    busy: false,
    options: []
  }),

  computed: {
    title () {
      return 'Изменить продюсера ' + this.character.name
    },

    hasProducers () {
      return this.options.length
    }
  },

  async created() {
    const { data } = await axios.get('/producers')
    this.options = data.items

    if (this.producer) {
      this.newProducer = this.options.find(producer => producer.id == this.producer.id)
    }
    this.loading = false
  },

  methods: {
    async onSubmit (evt) {
      evt.preventDefault()

      if (this.newProducer) {
        this.busy = true

        const response = await axios.put(`/characters/${this.character.id}/producer`, {
          producerAliasId: this.newProducer.id
        })

        if (response.status === 200) {
          this.$emit('submit', this.newProducer)
        }

        this.busy = false
        this.$refs.modal.hide()
      }
    },

    hide () {
      this.$refs.modal.hide()
    }
  }
}
</script>

<style>
</style>
