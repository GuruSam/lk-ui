<template>
  <b-container fluid>
    <h3 class="mb-4">Мои персонажи</h3>
    <b-row v-if="characters.length" class="contacts-col-view mt-3">
      <character v-for="char in characters" :key="char.id" :character="char" />
    </b-row>
    <b-card no-body v-else>
      <p class="mt-3 ml-3">Кажется, у вас еще нет персонажей. Подайте заявку на создание своего персого персонажа!</p>
    </b-card>
  </b-container>
</template>

<script>
import SmallCard from '@/components/characters/SmallCard'
// import { contentService } from '@/services'

export default {
  name: 'CharactersList',
  components: {
    'character': SmallCard
  },
  data: () => ({
    characters: []
  })
  // async beforeRouteEnter (to, from, next) {
  //   const { data } = await contentService.getCharacters('active')
  //   next(vm => vm.characters = data.items)
  // }
}
</script>
