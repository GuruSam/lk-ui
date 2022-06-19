<template>
  <div class="form-group position-relative mb-4">
    <div class="custom-controls-stacked">
      <label class="custom-control custom-checkbox">
        <input class="custom-control-input"
          type="checkbox"
          :checked="createDefault"
          :value="createDefault"
          @input="createDefault = $event.target.checked"
        >
        <span class="custom-control-label">Создать основной аккаунт <strong>{{ username }}</strong></span>
      </label>
    </div>

    <small class="form-text text-muted mb-3">Снимите галочку, если хотите сохранить анонимность и выбрать другое имя.</small>

    <transition name="slide">
    <div class="fields" v-if="!createDefault">
      <FormInput v-model="newUsername" label="Ник:" rules="required" />
      <FormInput v-model="email" label="Почта:" rules="required" />
    </div>
    </transition>

    <span class="d-block form-label mb-2">Персонажи, привязанные к этому аккаунту:</span>

    <div class="character-container" :class="{'selectable' : !createDefault}">
      <div 
        class="rounded ui-bordered p-2 mb-3 prod-character"
        v-for="character in characters"
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
  </div>
</template>

<script>
import FormInput from '@/components/form/FormInput'
import axios from 'axios'

export default {
  name: 'ProducerForm',

  props: {
    characters: Array
  },

  components: { 
    FormInput
  },

  data: () => ({
    createDefault: true,
    newUsername: null, 
    email: null
  }),

  // created () {
  //   if (!this.characters.length) {
  //     this.fetchCharacters()
  //   }
  // },

  computed: {
    username () {
      return this.$store.state.user.username
    },

    anonymCharacters () {
      return this.characters.filter(char => char.isAnonym)
    },

    openedCharacters () {
      return this.characters.filter(char => !char.isAnonym)
    }
  },

  methods: {
    async fetchCharacters () {
      const { data } = await axios.get('/characters')
      this.characters = [...data.active, ...data.idle]
    },

    onSelect (id) {
      if (!this.createDefault) {
        const character = this.characters.find(char => char.id === id)
        character.selected = character.selected ? false : true
        this.characters = [...this.characters]
      }
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
