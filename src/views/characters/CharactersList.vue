<template>
  <b-container fluid>
    <h3 class="mb-4">Мои персонажи</h3>
    <h4>В игре</h4>
    <b-row v-if="active.length" class="contacts-col-view mt-3">
      <character v-for="char in active" :key="char.id" :character="char" />
    </b-row>
    <h4 class="mt-4">Вне игры</h4>
    <b-row v-if="idle.length" class="contacts-col-view mt-3">
      <character v-for="char in idle" :key="char.id" :character="char" />
    </b-row>
  </b-container>
</template>

<script>
import SmallCard from '@/components/characters/SmallCard'
import { contentService } from '@/services'

export default {
  name: 'CharactersList',
  components: {
    'character': SmallCard
  },
  data: () => ({
    active: [],
    idle: []
  }),
  async beforeRouteEnter (to, from, next) {
    const { data } = await contentService.getCharacters()
    next(vm => {
      vm.active = data.active
      vm.idle = data.idle
    })
  }
}
</script>
