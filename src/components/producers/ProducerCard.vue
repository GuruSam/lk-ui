<template>
  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
    <div class="card card-bordered" ref="card">
      <div class="card-body media">
        <img class="avatar" width="100" height="100" alt="Аватар продюсера." :src="producer.avatar" />

        <div class="media-body pt-2">
          <h3 class="character-name mb-2">{{ producer.username }}</h3>

          <div class="link-group">
            <a class="character-link" target="_blank" :href="profileUrl">
              <span class="character-link__icon ion ion-ios-contact mr-1"></span>
              <span class="mr-2">Профиль</span>
            </a>
          </div>
        </div>
      </div>

      <footer class="card-footer py-3">
        <AuthButtons :character="producer" />
      </footer>
    </div>
  </div>
</template>

<script>
import AuthButtons from '@/components/characters/AuthButtons'

export default {
  name: 'ProducerCard',

  components: {
    AuthButtons
  },

  props: {
    producer: Object
  },

  computed: {
    profileUrl () {
      return 'https://playlabirint.ru/game/members/' + this.producer.id
    }
  }
}
</script>
