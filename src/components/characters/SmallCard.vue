<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
    <div class="card card-bordered profile-card" :class="{'character-card--shrink' : isCardShrunk}" ref="card">
      <div class="card-body media">
        <img class="profile-avatar" width="100" height="100" alt="Аватар персонажа." :src="character.avatar" />

        <div class="media-body pt-2">
          <h3 class="profile-name mb-2">{{ character.name }}</h3>

          <div class="text-big character-status mb-2" :class="statusColor">{{ status }}</div>

          <div>
            Продюсер: <a class="text-secondary producer-select-link" href="" @click.prevent="toggleSelect">{{ producer }}</a>
          </div>

          <div class="link-group mt-4">
            <a class="profile-link" target="_blank" :href="profileUrl">
              <span class="profile-link__icon ion ion-ios-contact mr-1"></span>
              <span v-if="!isCardShrunk" class="mr-2">Профиль</span>
            </a>

            <a class="profile-link" target="_blank" :href="wikiUrl">
              <span class="profile-link__icon ion ion-ios-clipboard mr-1"></span>
              <span v-if="!isCardShrunk" class="mr-2">Wiki</span>
            </a>
          </div>
        </div>
      </div>

      <footer class="card-footer py-3">
        <AuthButtons :character="character" />
        <span class="ion favorite-icon" 
          :class="character.isFavorite ? 'ion-md-star is-favorite' : 'ion-md-star-outline'"
          :title="character.isFavorite ? 'Удалить из избранных' : 'Добавить в избранные'"
          @click="onFavoriteClick"
        ></span>
      </footer>
    </div>

    <SelectProducer 
      v-if="showSelectProducer" 
      :character="character" 
      :producer="character.producerAlias" 
      @hidden="toggleSelect" 
      @submit="onProducerChange"
    />
  </div>
</template>

<script>
import AuthButtons from './AuthButtons'
import SelectProducer from '@/components/modals/SelectProducer'
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
    AuthButtons,
    SelectProducer
  },

  data: () => ({
    cardWidth: 0,
    showSelectProducer: false
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
    },

    wikiUrl () {
      return this.character.wikiUrl || 'https://wiki.playlabirint.ru/' + this.character.name.replace(' ', '_')
    },

    profileUrl () {
      return 'https://playlabirint.ru/character/profile/' + this.character.id
    },

    producer () {
      return this.character.producerAlias ? this.character.producerAlias.name : 'не выбран'
    }
  },

  methods: {
    onFavoriteClick () {
      return this.character.isFavorite 
        ? contentService.removeFromFavorites(this.character) 
        : contentService.addToFavorites(this.character)
    },

    onProducerChange (newProducer) {
      this.character.producerAlias = newProducer
    },

    toggleSelect () {
      this.showSelectProducer = !this.showSelectProducer
    }
  }
}
</script>

<style lang="scss">
.profile-card {
  margin-bottom: 1.5rem;
  background: linear-gradient(-45deg, #111a1a, #081212, #03252a, #050d0e);
  background-size: 400% 400%;
  animation: gradient 8s ease infinite;

  &--shrink {
    .card-body {
      padding: 1.3rem 1.3rem 0.8rem;
    }

    .profile-avatar {
      width: 80px;
      height: 80px;
    }

    .profile-name {
      font-size: 130%;
    }

    .profile-link--bordered {
      border: none;

      &:not(:last-child) {
        margin: 0;
      }
    }

    .character-status {
      margin-bottom: 1rem;
    }
  }

  .card-footer {
    display: flex;
    justify-content: space-between;
  }
}

.profile-name {
  font-size: 150%;
}

.profile-link {
  font-size: 0.8rem;
  color: #e0e1e1;

  &:not(:last-child) {
    margin-right: 0.5rem;
    border-right: 1px solid #a1a1a1;
  }

  &:hover {
    color: #ffffff;
  }
}

.profile-avatar {
  max-width: 100px;
  margin-right: 1.5rem;
  border: 2px solid #087482;
  border-radius: 50%;
  box-shadow: 0px 0px 12px #025661;
}

.profile-link__icon,
.favorite-icon,
.profile-link {
  transition: all 0.2s ease-in-out;
}

.profile-link__icon:hover,
.favorite-icon:hover {
  cursor: pointer;
}

.profile-link__icon {
  font-size: 1rem;
}

.favorite-icon:hover {
  color: #89e6f1;
}

.favorite-icon {
  align-self: center;
  font-size: 1.3rem;
}

.is-favorite {
  color: #89e6f1;
}

.producer-select-link {
  border-bottom: 1px dashed;
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

