<template>
  <section class="container-fluid">
    <h1 class="font-weight-bold py-3 mb-4 h4">Создать заявку</h1>

    <div class="card mb-4" ref="formContainer">
      <div class="card-body">
        <FormSelect v-model="category" :options="categories" track-by="id" track-label="name" label="Категория" placeholder="Выберите категорию" @input="onCategoryChange">
          <small class="form-text text-muted">
            Выберите тему заявки. Если затрудняетесь отнести свой вопрос к существующим категориям, выберите 'другое'
          </small>
        </FormSelect>
      </div>
      
      <div class="card-body" v-if="selectedForm">
        <DataLoader v-if="formLoading" />
        <component v-else :is="selectedForm" v-bind="formProps" @submit="createTicket" />
      </div>
    </div>
  </section>
</template>

<script>
import FormSelect from '@/components/form/FormSelect'
import DataLoader from '@/components/loaders/DataLoader'
import NpcForm from '@/components/npc/NpcForm'
import CustomForm from '@/components/tickets/CustomForm'
import axios from 'axios'

export default {
  name: 'TicketCreate',

  components: {
    FormSelect,
    DataLoader,
    NpcForm,
    CustomForm
  },

  data: () => ({
    formData: {},
    categories: [],
    characters: [],
    category: null,
    formLoading: false,

    npc: {
      physiqueOptions: [],
      classOptions: []
    }
  }),

  computed: {
    selectedForm () {
      if (!this.category) {
        return null
      }

      switch (this.category.handler) {
        case 'npc':
          return 'NpcForm'
        case 'custom':
          return 'CustomForm'
      
        default:
          return 'CustomForm'
      }
    },

    formProps () {
      if (!this.category) {
        return null
      }

      switch (this.category.handler) {
        case 'npc':
          return this.npc
        case 'custom':
          return { characters: this.characters }
      
        default:
          return {}
      }
    }
  },

  async beforeRouteEnter (to, from, next) {
    const { data } = await axios.get('/tickets/form')

    next(vm => {
      vm.categories = data.categories
      vm.characters = data.characters
    })
  },

  methods: {
    onCategoryChange (category) {
      if (category.id === 1) {
        this.fetchNpcOptions()
      }
    },

    async fetchNpcOptions () {
      this.formLoading = true

      const { data } = await axios.get('/npc/form')

      this.npc.physiqueOptions = data.physics
      this.npc.classOptions = data.class
      this.formLoading = false
    },

    createTicket (formData) {
      console.log(formData)
    }
  }
}
</script>

<style scoped>
.card-body:first-child {
  padding-bottom: 0.5rem !important;
}

.card-body:not(:last-child) {
  border-bottom: 1px solid rgba(255, 255, 255, 0.09);
}
</style>
