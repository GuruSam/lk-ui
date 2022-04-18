<template>
  <div class="container-fluid">
    <h1 class="sr-only">{{ ticketName }}</h1>

    <ol class="breadcrumb font-weight-bold h4 py-3 mb-4">
      <li class="breadcrumb-item">
        <router-link to="/tickets">Мои заявки</router-link>
      </li>

      <li class="breadcrumb-item active">
        <span>{{ ticketName }}</span>
      </li>
    </ol>

    <div class="row">
      <div class="col-lg-12 col-xl-8 col-xxl-9">
        <NpcHeader v-if="isNpcTicket" :data="ticket.entity" />
        <div class="card mb-4">
          <h6 class="card-header">Описание</h6>

          <NpcDescription v-if="isNpcTicket" :data="ticket.entity" />
          <div v-else class="card-body quotable" data-source="Описание">
            <div v-html="ticket.description" class="ticket-desc"></div>
          </div>
        </div>
        <TicketComments v-if="ticket.comments" :ticket-id="ticket.id" :total.sync="ticket.comments.total" ref="ticketComments" />
        <CiteButton ref="citeButton" />
      </div>

      <div class="col-md-6 col-xl-4 col-xxl-3">
        <div class="card mb-4 status-block">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <span class="display-4 ion" :class="statusIcon"></span>
              <div class="ml-3">
                <div class="text-muted small">Статус</div>
                <strong class="text-big" :class="statusColor">{{ ticketStatus[ticket.status] }}</strong>
              </div>
            </div>
          </div>
        </div>

        <div class="card mb-4">
          <h6 class="card-header">Детали заявки</h6>

          <div class="list-group list-group-flush">
            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Категория</span>
              <span>{{ ticket.category.name }}</span>
            </div>

            <div v-if="ticket.character" class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Персонаж</span>
              <span>
                <a href="javascript:void(0)">{{ ticket.character.name }}</a>
              </span>
            </div>

            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Создано</span>
              <Date class="text-right" :value="ticket.createdAt" />
            </div>

            <div class="list-group-item d-flex justify-content-between align-items-center">
              <span class="text-muted">Обновлено</span>
              <Date class="text-right" :value="ticket.updatedAt" />
            </div>

            <div class="list-group-item d-flex justify-content-center align-items-center text-center">
              <button v-if="!isCompleted" class="btn btn-primary" :disabled="submit" @click="completeTicket">Завершить</button>
              <p v-else >Вы можете переоткрыть заявку, оставив комментарий к ней.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { contentService } from '@/services'
import { contentMixin } from '@/mixins/content'
import TicketComments from '@/components/tickets/TicketComments'
import Date from '@/components/Date'
import CiteButton from '@/components/CiteButton'
import NpcDescription from '@/components/tickets/npc/NpcDescription'
import NpcHeader from '@/components/tickets/npc/NpcHeader'

const STATUS_COMPLETED = 5
const STATUS_ARCHIVED = 100

export default {
  name: 'TicketPage',
  mixins: [contentMixin],
  components: {
    TicketComments, Date, CiteButton, NpcDescription, NpcHeader
  },
  data: () => ({
    ticket: {
      category: {},
      character: {}
    },
    submit: false
  }),

  computed: {
    ticketName () {
      return this.ticket && this.ticket.name ? this.ticket.name : 'Заявка'
    },

    breadcrumb () { 
      return [
        { text: 'Мои заявки', to: { name: 'tickets' }},
        { text: this.ticketName, active: true }
      ]
    },

    isNpcTicket () {
      return this.ticket.entity && this.ticket.entity.handler === 'npc'
    },

    isArchived () {
      return this.ticket.status === STATUS_ARCHIVED
    },

    isCompleted () {
      return this.ticket.status === STATUS_COMPLETED || this.ticket.status === STATUS_ARCHIVED
    },

    statusColor () {
      switch (this.ticket.status) {
        case 1:
          return 'text-primary'
        case 2:
        case 5:
          return 'text-success'
        case 3:
          return 'text-warning'
        case 4:
          return 'text-danger'
        default:
          return 'text-secondary'
      }
    },

    statusIcon () {
      switch (this.ticket.status) {
        case 1:
          return 'ion-ios-bulb'
        case 2:
          return 'ion-md-flame'
        case 3:
        case 4:
          return 'ion-ios-chatbubbles'
        case 5:
          return 'ion-md-checkmark-circle-outline'
        default:
          return 'ion-ios-archive'
      }
    }
  },

  async beforeRouteEnter (to, from, next) {
    const { data } = await contentService.getTicket(to.params.id)

    next(vm => {
      document.title = 'ЛК - ' + data.name
      vm.ticket = data
    })
  },

  methods: {
    async reopenTicket () {
      const { data } = await contentService.getTicket(this.ticket.id)
      
      this.setData(data)
      this.$notify({ group: 'notifications', type: 'success', text: 'Тикет переоткрыт' })
    },

    completeTicket () {
      this.submit = true

      contentService.completeTicket(this.ticket.id)
        .then(() => {
          this.ticket.status = this.statusCompleted
          this.$notify({
            group: 'notifications',
            type: 'success',
            text: `Тикет «${this.ticket.name}» завершен`
          })
        })
        .finally(() => this.submit = false)
    }
  }
}
</script>

<style>
.status-block {
  background-image: linear-gradient(#12121473, #12121473 ),url(https://playlabirint.ru/img/bg3.jpg);
  background-size: cover;
}

.ticket-desc { 
  color: #d4d4d4;
}
</style>
