<template>
  <div>
    <section class="container-fluid">
      <h1 class="font-weight-bold py-3 mb-4 h4">Создать заявку</h1>

      <div class="card mb-4" ref="formContainer">
        <div class="card-body">
          <form>
            <div class="form-group position-relative">
              <label class="form-label" for="name">Название</label>
              <input class="form-control" :class="{'is-invalid' : errors.name}" id="name" type="text" v-model="formData.name" @change="validate('name')">

              <div v-if="errors.name" class="invalid-tooltip">Это поле не может быть пустым.</div>
              <small class="form-text text-muted">
                Укажите кратко тему заявки
              </small>
            </div>

            <div class="form-group position-relative">
              <label class="form-label" for="category">Категория</label>
              <select class="custom-select" :class="{'is-invalid' : errors.categoryId}" id="category" v-model="formData.categoryId" @change="validate('categoryId')">
                <option selected hidden></option>
                <option v-for="category in categories" :key="category.id" :value="category.id">
                  {{ category.name }}
                </option>
              </select>

              <div v-if="errors.categoryId" class="invalid-tooltip">Выберите категорию.</div>
              <small class="form-text text-muted">
                Выберите тему заявки. Если затрудняетесь отнести свой вопрос к существующим категориям, выберите 'другое'
              </small>
            </div>

            <div class="form-group">
              <label class="form-label" for="character">Персонаж</label>
              <select class="custom-select" id="character" v-model="formData.characterId">
                <option selected></option>
                <option v-for="character in characters" :key="character.id" :value="character.id">
                  {{ character.name }}
                </option>
              </select>
              <small class="form-text text-muted">
                Если заявка не относится к персонажу, оставьте поле пустым
              </small>
            </div>

            <div class="form-group position-relative">
              <label class="form-label">Суть заявки</label>
              <quill-editor ref="editor" v-model="formData.message" :disabled="submit" class="extended" @blur="validateEditor" />

              <div v-if="errors.message" class="invalid-tooltip">Это поле не может быть пустым.</div>
            </div>

            <div class="mt-4 mb-2">
              <button class="btn btn-primary" type="button" :disabled="submit" @click="createTicket">Создать</button>&nbsp;
              <button class="btn btn-default" type="button">Отменить</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { contentService } from '@/services'

export default {
  name: 'TicketCreate',

  data: () => ({
    formData: {
      name: '',
      categoryId: null,
      characterId: null,
      message: null,
    },
    required: ['name', 'categoryId'],

    characters: [],
    categories: [],

    submit: false,
    errors: {}
  }),

  async beforeRouteEnter (to, from, next) {
    const { data } = await contentService.getTicketForm()

    next(vm => {
      vm.categories = data.categories
      vm.characters = data.characters
    })
  },

  methods: {
    formHasErrors () {
      return Object.values(this.errors).some(error => error)
    },

    validate (field) {
      const fieldValue = this.formData[field]
      const errorExists = this.required.includes(field) && !fieldValue ? true : false

      this.$set(this.errors, field, errorExists)
    },

    validateEditor () {
      const editor = this.$refs.editor.quill
      const errorExists = editor.getText().trim().length > 0 ? false : true

      this.$set(this.errors, 'message', errorExists)
    },

    createTicket () {
      this.validate('name')
      this.validate('categoryId')
      this.validateEditor()

      if (this.formHasErrors()) {
        return this.$refs.formContainer.scrollIntoView()
      }

      this.submit = true
        
      contentService.createTicket(this.formData)
        .catch(() => this.submit = false)
        .then((ticket) => 
          this.$router.push(`/tickets/${ticket.data.id}`)
        )
    }
  }
}
</script>

<style scope>
.invalid-tooltip {
  display: inline-block !important;
  top: initial !important;
}
</style>

<style src="quill/dist/quill.core.css"></style>
<style src="quill/dist/quill.snow.css"></style>
<style src="@/plugins/editor/styles.css"></style>
