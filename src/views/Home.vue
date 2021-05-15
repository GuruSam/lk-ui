<template>
  <div>
    <b-container fluid>
      <h2 class="font-weight-bold py-3 mb-4">Главная</h2>
      <b-row>
        <b-col xl="9" lg="8" md="12" sm="12" >
          <b-row>
            <b-col>
              <data-table type="tickets" title="Активные заявки" :data="tickets.items" />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <data-table type="tasks" title="Задания в процессе" :data="tasks.items" />
            </b-col>
          </b-row>
          <div v-if="characters.favorites && characters.favorites.length">
            <b-row>
              <b-col class="mt-2"><h3>Избранные персонажи</h3></b-col>
            </b-row>
            <b-row>
              <character v-for="char in characters.favorites" :key="char.id" :character="char" />
            </b-row>
          </div>
        </b-col>
        <b-col xl="3" lg="4" md="12" sm="12">
          <b-row>
            <info-card light icon="ios-contacts" :number="characters.total" :text="charactersInGame" />
            <info-card icon="ios-people" :number="npc.total" text="NPC в игре" />
            <info-card light icon="ios-mail" :number="tickets.needAnswerCount" :text="ticketsPending" />
            <info-card icon="md-list-box" :number="tasks.total" :text="activeTasks" />
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import Table from '@/components/dashboard/Table'
import InfoCard from '@/components/dashboard/InfoCard'
import SmallCard from '@/components/characters/SmallCard'
import { contentService } from '@/services'

export default {
  name: 'Home',
  metaInfo: {
    title: 'Главная'
  },
  components: {
    'data-table': Table,
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
      .then(({ data }) => {
        next(vm => vm.setData(data))
      })
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
    setData ({ tickets, tasks, characters, npc }) {
      this.tickets = tickets || this.tickets
      this.tasks = tasks || this.tasks
      this.characters = characters || this.characters
      this.npc = npc || this.npc
    }
  }
}
</script>
