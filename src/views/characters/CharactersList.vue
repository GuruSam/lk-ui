<template>
  <section class="container-fluid">
    <h1 class="mb-4 h3">Мои персонажи</h1>

    <div v-if="active.length" class="row mt-3">
      <character v-for="character in active" :key="character.id" :character="character" />
    </div>

    <h2 class="h5" :class="{'mt-5' : active.length}">Неактивные</h2>
    <div v-if="idle.length" class="row mt-3">
      <character v-for="character in idle" :key="character.id" :character="character" />
    </div>
  </section>
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
