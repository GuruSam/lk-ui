<template>
  <div class="container-fluid">
    <page-title class="mb-0" title="Персонажи" sub-title="Ваши игровые персонажи" />

    <div v-if="active.length" class="row mt-3">
      <character v-for="character in active" :key="character.id" :character="character" producer-editable gradient favorable />
    </div>

    <h2 class="h5" :class="{'mt-5' : active.length}">Неактивные</h2>
    <div v-if="idle.length" class="row mt-3">
      <character v-for="character in idle" :key="character.id" :character="character" producer-editable gradient favorable />
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import SmallCard from '@/components/characters/SmallCard'
import { contentService } from '@/services'

export default {
  name: 'CharactersList',
  components: {
    'character': SmallCard,
    'page-title': PageTitle
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
