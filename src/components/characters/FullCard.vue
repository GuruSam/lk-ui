<template>
  <b-col xl="3" lg="4" md="4" sm="6">
    <b-card class="mb-4" no-body>
      <div class="banner"></div>
      <div class="contact-content">
        <img :src="character.avatar" class="rounded-circle avatar ui-w-120 mt-4" alt="">
        <div class="contact-content-about mt-4">
          <h4 class="contact-content-name mb-2 lead"><a href="javascript:void(0)" class="text-body">{{ character.name }}</a></h4>
          <div class="text-success lead mb-2">{{ status }}</div>
        </div>
        <div class="mt-4 link-group">
          <a href="#"><span class="h5 ion ion-ios-contact link-icon mr-2 text-white"></span></a>
          <a href="#"><span class="h5 ion ion-ios-clipboard link-icon mr-2 text-white"></span></a>
          <a href="#"><span class="h5 ion ion-ios-book link-icon text-white"></span></a>
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
.link-group {
  margin-bottom: -25px;
}
.link-icon {
  transition: all 0.2s ease-in-out;
}
.link-icon:hover {
  cursor: pointer;
  color: #028291 !important;
}
.banner {
  width: 100%;
  height: 200px;
  position: absolute;
  background-image: linear-gradient( #12121454, #121214 ),url(https://playlabirint.ru/img/bg3.jpg);
  background-size: cover;
}
.contact-content {
  z-index: 100;
  margin-top: 50px;
}
</style>
