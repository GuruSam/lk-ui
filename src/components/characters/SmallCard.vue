<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
    <div class="card card-bordered character-card mb-4">
      <div class="card-body">
        <div class="media">
          <img 
            :src="character.avatar" 
            alt="avatar" 
            class="rounded-circle avatar" 
            :class="breakpoint.isXl ? 'ui-w-80' : 'ui-w-100'"
          />
          <div class="media-body pt-2 ml-4">
            <h5 class="mb-2" :class="{ 'text-large' : !breakpoint.isXl }">{{ character.name }}</h5>
            <div class="text-success text-big mb-2">{{ status }}</div>
            <div class="mt-4 link-group">
              <a href="#"><span class="h5 ion ion-ios-contact link-icon mr-2 text-white"></span></a>
              <a href="#"><span class="h5 ion ion-ios-clipboard link-icon mr-2 text-white"></span></a>
              <a href="#"><span class="h5 ion ion-ios-book link-icon text-white"></span></a>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer py-3">
        <AuthButtons :character="character" />
      </div>
    </div>
  </div>
</template>

<script>
import AuthButtons from './AuthButtons'

export default {
  name: 'small-card',
  props: {
    character: {
      type: Object,
      default: () => {}
    }
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
.character-card {
  background: linear-gradient(-45deg, #111a1a, #081212, #03252a, #050d0e);
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;
}
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

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@-webkit-keyframes gradient {
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@-moz-keyframes gradient {
  0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}
</style>

