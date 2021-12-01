<template>
  <b-container fluid>
    <h4 class="font-weight-bold py-3 mb-4">
      Создать заявку
    </h4>

    <b-card no-body>
      <b-card-body class="pb-2">
        <b-form-group label="Название" description="Укажите кратко тему заявки">
          <b-input v-model="name" required />
        </b-form-group>
        <b-form-group label="Категория" description="Выберите тему заявки. Если затрудняетесь отнести свой вопрос к существующим категориям, выберите 'другое'">
          <b-select v-model="category" :options="categories" required />
        </b-form-group>
        <b-form-group label="Персонаж" description="Если заявка не относится к персонажу, оставьте поле пустым">
          <b-select v-model="character" :options="characters" />
        </b-form-group>
        <b-form-group label="Суть заявки">
          <Editor ref="editor" extended />
        </b-form-group>

        <div class="mt-4 mb-2">
          <b-btn variant="primary">Отправить</b-btn>&nbsp;
          <b-btn variant="default">Отменить</b-btn>
        </div>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import Editor from '@/components/Editor'
import { contentService } from '@/services'

export default {
  name: 'TicketCreate',

  components: { 
    Editor 
  },

  data: () => ({
    name: '',
    characters: [],
    categories: [],
    category: null,
    character: null
  }),

  async beforeRouteEnter (to, from, next) {
    const { data } = await contentService.getTicketForm()

    next(vm => {
      vm.setCategories(data.categories)
      vm.setCharacters(data.characters)
    })
  },

  methods: {
    setCategories (categories) {
      this.categories = categories.map(category => ({ value: category.id, text: category.name }))
    },
    setCharacters (characters) {
      this.characters = characters.map(character => ({ value: character.id, text: character.name }))
    }
  }
}
</script>
