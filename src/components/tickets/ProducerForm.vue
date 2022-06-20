<template>
  <observer tag="form" ref="form">
    <p class="mb-2" v-if="openedCharacters.length">
      У вас есть неанонимные персонажи. В первую очередь создайте продюсера для них.
    </p>
    <FormInput v-model="username" label="Ник:" rules="required" type="text" />
    <FormInput v-model="email" label="Почта:" rules="required" type="email" />
    <FormInput v-model="birthday" label="Дата рождения:" rules="required" type="date" />

    <span class="d-block form-label mb-2" v-if="characters.length">Персонажи, привязанные к этому аккаунту:</span>

    <div class="character-container" :class="{'selectable' : openedCharacters.length === 0}">
      <div 
        class="rounded ui-bordered p-2 mb-2 prod-character"
        v-for="character in characterList"
        :class="{'selected' : character.selected}" 
        :key="character.id" 
        @click="onSelect(character.id, $event)"
      >
        <div class="media align-items-center">
          <img :src="character.avatar" class="d-block ui-w-30 rounded-circle" alt="Аватар.">
          <div class="media-body ml-2">{{ character.name }}</div>
        </div>
      </div>
    </div>

    <span v-if="error" class="d-block text-danger mb-2">{{ error }}</span>
    <Button class="mt-3" :loading="submit" @click.prevent="submitForm">Создать</Button>
  </observer>
</template>

<script>
import FormInput from '@/components/form/FormInput'
import Button from '@/components/Button'
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
      error: null
    }
  },

  async created () {
    this.characters = await this.fetchCharacters()
    this.characters.forEach(char => {
      if (this.formData.characters.find(selected => selected.id === char.id)) {
        char.selected = true
      }
    })
    this.$emit('loaded', true)
  },

  computed: {
    anonymCharacters () {
      return this.characters.filter(char => char.isAnonym)
    },

    openedCharacters () {
      return this.characters.filter(char => !char.isAnonym)
    },

    characterList () {
      return this.openedCharacters.length > 0 ? this.openedCharacters : this.anonymCharacters
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
      const selected = this.openedCharacters.length > 0 ? this.openedCharacters : this.characters.filter(char => char.selected)

      if (!success) {
        return this.setSubmit(false)
      }

      if (this.anonymCharacters.length && !selected.length) {
        this.error = 'Нужно выбрать хотя бы одного персонажа'
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
