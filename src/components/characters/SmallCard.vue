<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-6">
    <div class="card card-bordered character-card mb-4" :class="{'character-card--shrink' : isCardShrunk}" ref="card">
      <div class="card-body">
        <div class="media">
          <img
            class="avatar" 
            width="100"
            height="100"
            alt="Аватар персонажа." 
            :src="character.avatar"
          />

          <div class="media-body pt-2">
            <h3 class="character-name mb-2">{{ character.name }}</h3>

            <div class="text-big character-status" :class="statusColor">{{ status }}</div>

            <div class="link-group">
              <a class="text-white character-link character-link--bordered" 
                target="_blank"
                :href="'https://playlabirint.ru/character/profile/' + character.id" 
              >
                <span class="ion ion-ios-contact link-icon mr-1"></span>
                <span v-if="!isCardShrunk" class="mr-2">Профиль</span>
              </a>

              <a :href="character.wikiUrl" target="_blank" class="text-white character-link">
                <span class="ion ion-ios-clipboard link-icon mr-1"></span>
                <span v-if="!isCardShrunk" class="mr-2">Wiki</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer class="card-footer py-3">
        <AuthButtons :character="character" />
        <span 
          class="ion favorite-icon" 
          :class="character.isFavorite ? 'ion-md-star is-favorite' : 'ion-md-star-outline'"
          @click="onFavoriteClick"
        ></span>
      </footer>
    </div>
  </div>
</template>

<script>
import AuthButtons from './AuthButtons'
import { contentService } from '@/services'

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

  data: () => ({
    cardWidth: 0
  }),

  mounted() {
    const card = this.$refs.card
    this.cardWidth = card.clientWidth

    let timeout = null
    window.addEventListener('resize', () => {
      clearTimeout(timeout)

      timeout = setTimeout(() => {
        this.cardWidth = card.clientWidth

        clearTimeout(timeout)
      }, 250)
    })
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
    },

    statusColor () {
      switch (this.character.status) {
        case 0:
          return 'text-danger'
        case 1: 
          return 'text-success'
        case 2:
          return 'text-warning'
        default:
          return 'text-primary'
      }
    },

    isCardShrunk () {
      return this.cardWidth < 350
    }
  },

  methods: {
    onFavoriteClick () {
      return this.character.isFavorite ? contentService.removeFromFavorites(this.character) : contentService.addToFavorites(this.character)
    }
  }
}
</script>

<style lang="scss" scoped>
.card-footer {
  display: flex;
  justify-content: space-between;
}

.character-card {
  background: linear-gradient(-45deg, #111a1a, #081212, #03252a, #050d0e);
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;

  &--shrink {
    .card-body {
      padding: 1.3rem 1.3rem 0.8rem;
    }

    .avatar {
      width: 80px;
      height: 80px;
    }

    .character-name {
      font-size: 130%;
    }

    .character-link--bordered {
      border: none;

      &:not(:last-child) {
        margin: 0;
      }
    }

    .character-status {
      margin-bottom: 1rem;
    }
  }
}

.character-name {
  font-size: 150%;
}

.character-status {
  margin-bottom: 1.5rem;
}

.character-link {
  &:not(:last-child) {
    margin-right: 0.5rem;
  }

  &--bordered {
    border-right: 1px solid #a1a1a1;
  }
}

.direction-column {
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.direction-column .avatar {
  margin-right: 0;
}

.avatar {
  max-width: 100px;
  margin-right: 1.5rem;
  border: 2px solid #087482;
  border-radius: 50%;
  box-shadow: 0px 0px 12px #025661;
}

.link-icon,
.favorite-icon {
  transition: all 0.2s ease-in-out;
}

.link-icon:hover,
.favorite-icon:hover {
  cursor: pointer;
  color: #89e6f1;
}

.favorite-icon {
  align-self: center;
  font-size: 1.3rem;
}

.link-icon {
  font-size: 1rem;
  color: #ffffff;
}

.is-favorite {
  color: #89e6f1;
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

