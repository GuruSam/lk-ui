<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-6 col-xxl-4">
    <div class="card card-bordered character-card" :class="{'character-card--shrink' : isCardShrunk}" ref="card">
      <div class="card-body media">
        <img class="avatar" width="100" height="100" alt="Аватар персонажа." :src="character.avatar" />

        <div class="media-body pt-2">
          <h3 class="character-name mb-2">{{ character.name }}</h3>

          <div class="text-big character-role">{{ character.role }}</div>

          <div class="link-group">
            <a class="character-link" target="_blank" :href="profileUrl">
              <span class="character-link__icon ion ion-ios-contact mr-1"></span>
              <span v-if="!isCardShrunk" class="mr-2">Профиль</span>
            </a>

            <a class="character-link" target="_blank" :href="wikiUrl">
              <span class="character-link__icon ion ion-ios-clipboard mr-1"></span>
              <span v-if="!isCardShrunk" class="mr-2">Wiki</span>
            </a>
          </div>
        </div>
      </div>

      <footer class="card-footer py-3">
        <AuthButtons :character="character" />
      </footer>
    </div>
  </div>
</template>

<script>
import AuthButtons from '@/components/characters/AuthButtons'

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
    isCardShrunk () {
      return this.cardWidth < 350
    },

    wikiUrl () {
      return this.character.wikiUrl || 'https://wiki.playlabirint.ru/' + this.character.name.replace(' ', '_')
    },

    profileUrl () {
      const id = this.character.id
      return this.character.status ? `https://playlabirint.ru/character/profile/${id}` : `https://playlabirint.ru/npc/view/${id}`
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
  margin-bottom: 1.5rem;
  background-size: 400% 400%;

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

.character-role {
  color: #4b939f;
  margin-bottom: 1.5rem;
}

.character-link {
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

.avatar {
  max-width: 100px;
  margin-right: 1.5rem;
  border: 2px solid #087482;
  border-radius: 50%;
  box-shadow: 0px 0px 12px #025661;
}

.character-link__icon,
.favorite-icon,
.character-link {
  transition: all 0.2s ease-in-out;
}

.character-link__icon:hover,
.favorite-icon:hover {
  cursor: pointer;
}

.character-link__icon {
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
</style>

