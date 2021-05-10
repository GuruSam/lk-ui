<template>
  <b-col xl="3" lg="4" md="4" sm="6">
    <b-card class="mb-4" no-body>
      <div class="contact-content">
        <img :src="character.avatar" class="rounded-circle avatar ui-w-120 mt-4" alt="">
        <div class="contact-content-about mt-4">
          <h4 class="contact-content-name mb-2 lead"><a href="javascript:void(0)" class="text-body">{{ character.name }}</a></h4>
          <div class="text-success lead mb-2">{{ status }}</div>
        </div>
      </div>
      <div class="card-footer py-3 mt-4">
        <AuthButtons :character="character" />
      </div>
    </b-card>
  </b-col>
</template>

<style src="@/vendor/styles/pages/contacts.scss" lang="scss"></style>

<script>
import AuthButtons from '@/components/characters/AuthButtons'

export default {
  name: 'FullCard',
  props: {
    character: Object
  },
  components: {
    AuthButtons
  },
  computed: {
    status () {
      switch (this.character.status) {
        case 0:
          return 'Вне игры'
        case 1: 
          return 'В игре'
        case 2:
          return 'Недоступен'
        default:
          return 'Неизвестно'
      }
    }
  }
}
</script>

<style scoped>
.avatar {
  border: 2px solid #087482;
  box-shadow: 0px 0px 12px #025661;
}
</style>
