<template>
  <div class="container-fluid">
    <page-title class="mb-0" title="Главная"></page-title>
    <div class="alert alert-custom" role="alert">
      <img class="warning-icon" src="/images/warning-sign-sm.png" alt="Знак предупреждения." width="60" height="52">
      <p>
        Добро пожаловать! Личный кабинет продюсера находится в активной разработке, поэтому возможны баги.
        Если вы заметили ошибку, не стесняйтесь сообщить об этом <a href="https://t.me/gurusamius" target="_blank">@gurusamius</a>.
      </p>
    </div>
    <div class="row">
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-9">
        <div class="row">
          <div class="col">
            <info-table
              type="tickets"
              title="Активные заявки"
              empty="Активных заявок нет"
              :data="tickets.items"
            />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <info-table
              type="tasks"
              title="Задания в процессе"
              empty="Активных заданий нет"
              :data="tasks.items"
            />
          </div>
        </div>
        <div v-if="favoriteCharacters.length">
          <div class="row">
            <div class="col mt-2"><h3>Избранные персонажи</h3></div>
          </div>
          <TransitionGroup name="fade" tag="div" class="row">
            <character v-for="char in favoriteCharacters" :key="char.id" :character="char" gradient favorable simple @unfavorite="removeFromFavorites" />
          </TransitionGroup>
        </div>
      </div>
      <div class="col-sm-12 col-md-12 col-lg-12 col-xl-3">
        <div class="row">
          <info-card light icon="ios-contacts" :number="characters.total" :text="charactersInGame" />
          <info-card icon="ios-people" :number="npc.total" text="NPC в игре" />
          <info-card light icon="ios-mail" :number="tickets.needAnswerCount" :text="ticketsPending" />
          <info-card icon="md-list-box" :number="tasks.total" :text="activeTasks" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InfoTable from '@/components/dashboard/InfoTable'
import InfoCard from '@/components/dashboard/InfoCard'
import SmallCard from '@/components/characters/SmallCard'
import { contentService } from '@/services'
import { declOfNum } from '@/helpers.js'
import PageTitle from '@/components/PageTitle'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная'
  },
  components: {
    'info-table': InfoTable,
    'info-card': InfoCard,
    'character': SmallCard,
    'page-title': PageTitle,
  },
  data: () => ({
    tickets: {},
    tasks: {},
    characters: {
      favorites: []
    },
    npc: {
      favorites: []
    }
  }),
  beforeRouteEnter (to, from, next) {
    contentService.getDashboardInfo()
      .then(({ data }) => next(vm => vm.setData(data)))
      .catch(() => next())
  },
  computed: {
    charactersInGame () {
      return declOfNum(this.characters.total, ['персонаж', 'персонажа', 'персонажей']) + ' в игре'
    },

    ticketsPending () {
      return declOfNum(this.tickets.needAnswerCount, ['заявка', 'заявки', 'заявок']) + ' ' + declOfNum(this.tickets.needAnswerCount, ['ждёт', 'ждут', 'ждут']) + ' Вашего ответа'
    },

    activeTasks () {
      return declOfNum(this.tasks.total, ['задание', 'задания', 'заданий']) + ' в процессе'
    },

    favoriteCharacters () {
      return [...this.characters.favorites, ...this.npc.favorites]
    }
  },
  methods: {
    setData ({ tickets = {}, tasks = {}, characters = {}, npc = {} }) {
      characters.favorites.forEach(char => char.isFavorite = true)

      this.tickets = tickets
      this.tasks = tasks
      this.characters = characters
      this.npc = npc
    },

    removeFromFavorites (id) {
      this.characters.favorites = this.characters.favorites.filter(char => char.id !== id)
      this.npc.favorites = this.npc.favorites.filter(char => char.id !== id)
    }
  }
}
</script>

<style>
.alert-custom {
  display: flex;
  align-items: center;
  background-color: #131315;
  color: #c3c3c3;
  font-style: italic;
  font-weight: 300;
}

.alert-custom p {
  margin: 0;
}

@media (max-width: 450px) {
  .alert-custom {
    flex-direction: column;
  }

  .warning-icon {
    margin: 0 0 15px 0;
  }
}

.warning-icon {
  margin-right: 20px;
  margin-left: 10px;
}
</style>
