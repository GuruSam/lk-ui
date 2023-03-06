<template>
  <span class="ion favorite-icon" 
    :class="character.isFavorite ? 'ion-md-star is-favorite' : 'ion-md-star-outline'"
    :title="character.isFavorite ? 'Удалить из избранных' : 'Добавить в избранные'"
    @click="onClick"
  ></span>
</template>

<script>
import axios from 'axios'

export default {
  name: 'FavoriteButton',

  props: {
    character: {
      type: Object,
      default: () => {}
    },

    apiCall: {
      type: String,
      default: 'characters'
    }
  },

  methods: {
    onClick () {
      return this.character.isFavorite 
        ? this.removeFromFavorites() 
        : this.addToFavorites()
    },

    removeFromFavorites () {
      axios.delete(`/${this.apiCall}/${this.character.id}/favorite`)
        .then(() => {
          this.character.isFavorite = false
          this.$emit('toggle', this.character)
        })
    },

    addToFavorites () {
      axios.post(`/${this.apiCall}/${this.character.id}/favorite`)
        .then(() => {
          this.character.isFavorite = true
          this.$emit('toggle', this.character)
        })
    }
  }
}
</script>
