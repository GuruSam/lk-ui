<template>
  <div class="producer-form">
    <loader v-if="loading" />
    <observer v-else tag="form" ref="form">
      <FormInput v-model="username" label="Ник:" rules="required" type="text" />
      <FormInput v-model="email" label="Почта:" rules="required|email" type="email">
        <small class="form-text text-muted">
          Должна быть уникальной и не повторяться с персонажами.
        </small>
      </FormInput>
      <FormInput v-model="birthday" label="Дата рождения:" rules="required" type="date">
        <small class="form-text text-muted">
          Любая удобная для вас дата, требуется для регистрации аккаунта.
        </small>
      </FormInput>

      <span class="d-block form-label mb-2" v-if="characters.length">Персонажи, привязанные к этому продюсеру:</span>

      <div class="character-container selectable">
        <div 
          class="rounded ui-bordered p-2 mb-2 prod-character"
          v-for="character in characters"
          :class="{'selected' : character.selected}" 
          :key="character.id" 
          @click="onSelect(character.id, $event)"
        >
          <div class="media align-items-center">
            <img :src="character.avatar" class="d-block ui-w-30 rounded-circle" alt="Аватар.">
            <div class="media-body ml-2">
              {{ character.name }}
              <span v-if="character.isAnonym" class="badge badge-secondary ml-2">Аноним</span>
            </div>
          </div>
        </div>
      </div>

      <span v-if="error" class="d-block text-danger mb-2">{{ error }}</span>
      <Button class="mt-3" :loading="submit" @click.prevent="submitForm">Создать</Button>
    </observer>
  </div>
</template>

<script>
import FormInput from '@/components/form/FormInput'
import Button from '@/components/Button'
import DataLoader from '@/components/loaders/DataLoader'
import { ValidationObserver } from 'vee-validate'
import axios from 'axios'

export default {
  name: 'ProducerForm',

  props: {
    formData: {
      type: Object,
      default: () => ({
        username: null,
        email: null,
        birthday: null,
        characters: []
      })
    }
  },

  components: { 
    FormInput,
    Button,
    'loader': DataLoader,
    'observer': ValidationObserver
  },

  data: function () {
    return {
      username: this.formData.username || this.$store.state.user.username,
      email: this.formData.email,
      birthday: this.formData.birthday,
      characters: [],
      createDefault: true,
      submit: false,
      loading: true,
      error: null
    }
  },

  async created () {
    this.loading = true
    this.characters = await this.fetchCharacters()
    this.characters.forEach(char => {
      if (this.formData.characters.find(selected => selected.id === char.id)) {
        char.selected = true
      }
    })
    this.loading = false
  },

  computed: {
    anonymCharacters () {
      return this.characters.filter(char => char.isAnonym)
    },

    openedCharacters () {
      return this.characters.filter(char => !char.isAnonym)
    }
  },

  methods: {
    async fetchCharacters () {
      const { data } = await axios.get('/tickets/form')

      return data.characters.filter(char => !char.producerAliasId)
    },

    onSelect (id) {
      const character = this.characters.find(char => char.id === id)
      character.selected = character.selected ? false : true
      this.characters = [...this.characters]
    },

    async submitForm () {
      this.setSubmit(true)
      this.error = null

      const success = await this.$refs.form.validate()
      const selected = this.characters.filter(char => char.selected)

      if (!success) {
        return this.setSubmit(false)
      }
      if (this.characters.length && !selected.length) {
        this.error = 'Нужно выбрать хотя бы одного персонажа'
        return this.setSubmit(false)
      }

      const notAllSelected = this.openedCharacters.some(char => !selected.includes(char))
      if (notAllSelected) {
        this.error = 'Вы выбрали не всех неанонимных персонажей. Все ваши неанонимные персонажи должны быть привязаны к одному продюсеру.'
        return this.setSubmit(false)
      }

      const formData = {
        username: this.username,
        email: this.email,
        birthday: this.birthday,
        characters: selected.map(char => char.id)
      }

      this.$emit('submit', formData)
    },

    setSubmit (state) {
      this.submit = state
    }
  }
}
</script>

<style>
.selectable .prod-character {
  cursor: pointer;
}

.selectable .prod-character:hover {
  background-color: rgb(0, 135, 150, 0.2);
}

.selectable .prod-character.selected {
  background-color: rgb(0, 135, 150, 0.6);
}
</style>
