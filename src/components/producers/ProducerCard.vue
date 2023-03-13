<template>
  <div class="col-sm-6 col-md-6 col-lg-6 col-xl-4 col-xxl-4">
    <div class="card card-bordered profile-card" ref="card">
      <div class="card-body media">
        <img class="profile-avatar" width="100" height="100" alt="Аватар продюсера." :src="producer.avatar" />

        <div class="media-body pt-2">
          <h3 class="profile-name mb-2">{{ producer.username }}</h3>

          <div v-if="producer.isMain">
            <span class="text-secondary">Основной</span>
            <span id="mark-icon" class="ion ion-md-checkmark-circle text-secondary main-icon"></span>
            <b-tooltip target="mark-icon" triggers="hover" variant="primary" custom-class="mark-icon-tooltip">
              Этот продюсер будет получать оповещения из ЛК
            </b-tooltip>
          </div>

          <div class="link-group mt-2">
            <a class="profile-link" target="_blank" :href="profileUrl">
              <span class="profile-link__icon ion ion-ios-contact mr-1"></span>
              <span class="mr-2">Профиль</span>
            </a>
          </div>
        </div>
      </div>

      <footer class="card-footer py-3">
        <AuthButtons :character="producer" />

        <DataLoader v-if="busy" class="settings-loader" small />
        <div v-else class="producer-settings">
          <span class="ion ion-md-settings producer-settings__icon text-muted" @click.stop="onSettingsClick"></span>
          <div class="dropdown-menu producer-settings__menu" :class="{'show' : showDropdown}" @click.stop>
            <a class="dropdown-item" href="javascript:void(0)" @click="switchToMain">Сделать основным</a>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
import AuthButtons from '@/components/characters/AuthButtons'
import DataLoader from '@/components/loaders/DataLoader'
import axios from 'axios'

export default {
  name: 'ProducerCard',

  components: {
    AuthButtons,
    DataLoader
  },

  props: {
    producer: Object
  },

  data: () => ({
    showDropdown: false,
    busy: false
  }),

  computed: {
    profileUrl () {
      return 'https://playlabirint.ru/game/members/' + this.producer.id
    }
  },

  created() {
    document.addEventListener('click', () => {
      if (this.showDropdown) this.showDropdown = false
    })
  },

  methods: {
    onSettingsClick () {
      this.showDropdown = !this.showDropdown
    },

    async switchToMain () {
      this.showDropdown = false

      if (this.producer.isMain) return

      this.busy = true
      const response = await axios.post(`/producers/${this.producer.id}/main`)

      if (response.status === 200) {
        this.$emit('switched-to-main', this.producer)
        this.$notify({ group: 'notifications', type: 'success', text: `${this.producer.username} назначен основным продюсером` })
      }

      this.busy = false
    }
  }
}
</script>

<style scoped>
.producer-settings__icon {
  align-self: center;
  font-size: 1.3rem;
}

.producer-settings__icon:hover {
  cursor: pointer;
  color: #838383 !important;
}

.producer-settings__menu {
  top: initial;
  left: initial;
}

@media (max-width: 576px) {
  .producer-settings__menu {
    right: 0;
  }
}

.main-icon {
  font-size: 1rem;
}

.mark-icon-tooltip .tooltip-inner {
  background-color: #00acc1 !important;
}

.settings-loader {
  margin: 0 !important;
}
</style>
