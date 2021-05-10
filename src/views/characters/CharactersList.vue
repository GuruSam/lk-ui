<template>
  <b-container fluid>
    <b-row class="contacts-col-view">
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
