<template>
  <div>
    <b-container fluid>
      <h2 class="font-weight-bold py-3 mb-4">Главная</h2>
      <div class="alert alert-custom" role="alert">
        <img class="warning-icon" src="/images/warning-sign.png" alt="Знак предупреждения." width="60" height="52">
        Добро пожаловать! Личный кабинет продюсера находится в активной разработке, поэтому возможны баги.
        Если вы заметили ошибку, не стесняйтесь сообщить об этом <a href="https://t.me/gurusamius" target="_blank">@gurusamius</a>.
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
          <div v-if="characters.favorites && characters.favorites.length">
            <div class="row">
              <div class="col mt-2"><h3>Избранные персонажи</h3></div>
            </div>
            <div class="row">
              <character v-for="char in characters.favorites" :key="char.id" :character="char" />
            </div>
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
    </b-container>
  </div>
</template>

<script>
import InfoTable from '@/components/dashboard/InfoTable'
import InfoCard from '@/components/dashboard/InfoCard'
import SmallCard from '@/components/characters/SmallCard'
import { contentService } from '@/services'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная'
  },
  components: {
    'info-table': InfoTable,
    'info-card': InfoCard,
    'character': SmallCard
  },
  data: () => ({
    tickets: {},
    tasks: {},
    characters: {},
    npc: {}
  }),
  beforeRouteEnter (to, from, next) {
    contentService.getDashboardInfo()
      .then(({ data }) => next(vm => vm.setData(data)))
      .catch(() => next())
  },
  computed: {
    charactersInGame () {
      return this.declOfNum(this.characters.total, ['персонаж', 'персонажа', 'персонажей']) + ' в игре' 
    },

    ticketsPending () {
      return this.declOfNum(this.tickets.needAnswerCount, ['заявка', 'заявки', 'заявок']) + ' ' + this.declOfNum(this.tickets.needAnswerCount, ['ждёт', 'ждут', 'ждут']) + ' Вашего ответа'
    },

    activeTasks () {
      return this.declOfNum(this.tasks.total, ['задание', 'задания', 'заданий']) + ' в процессе'
    }
  },
  methods: {
    setData ({ tickets = {}, tasks = {}, characters = {}, npc = {} }) {
      characters.favorites.forEach(char => char.isFavorite = true)

      this.tickets = tickets
      this.tasks = tasks
      this.characters = characters
      this.npc = npc
    }
  }
}
</script>

<style scoped>
.alert-custom {
  background-color: #131315;
  color: #c3c3c3;
  font-style: italic;
}

.warning-icon {
  margin-right: 10px;
  margin-left: 10px;
}
</style>
