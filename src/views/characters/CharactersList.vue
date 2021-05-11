<template>
  <b-container fluid>
    <h3 class="mb-4">Мои персонажи</h3>
    <b-row class="contacts-col-view mt-3">
      <character :character="character" />
    </b-row>
  </b-container>
</template>

<script>
import FullCard from '@/components/characters/FullCard'

export default {
  name: 'CharactersList',
  components: {
    'character': FullCard
  },
  data: () => ({
    character: {
      avatar: 'https://playlabirint.ru/data/avatars/l/520/520534.jpg',
      name: 'Мэддокс',
      status: 1
    }
  })
}
</script>
