<template>
  <b-container fluid>
    <h4 class="py-3 mb-4">
      <b-breadcrumb :items="breadcrumb" class="font-weight-bold m-0" />
    </h4>

    <div class="row">
      <div class="col-lg-12 col-xl-8 col-xxl-9">
        <b-card header="Описание" header-tag="h6" class="mb-4">
          <div v-html="ticket.description" class="ticket-desc"></div>
        </b-card>
        <TicketComments v-if="ticket.comments" :ticket-id="ticket.id" :total.sync="ticket.comments.total" />
      </div>

      <div class="col-md-6 col-xl-4 col-xxl-3">
        <div>
          <b-card class="mb-4 status-block">
            <div class="d-flex align-items-center">
              <span class="display-4 ion" :class="statusIcon"></span>
              <div class="ml-3">
                <div class="text-muted small">Статус</div>
                <strong class="text-big" :class="statusColor">{{ ticketStatus[ticket.status] }}</strong>
              </div>
            </div>
          </b-card>
        </div>
        <b-card no-body class="mb-4">
          <b-card-header header-tag="h6">Детали заявки</b-card-header>
          <b-list-group :flush="true">
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div class="text-muted">Категория</div>
              <div>{{ ticket.category.name }}</div>
            </b-list-group-item>
            <b-list-group-item v-if="ticket.character" class="d-flex justify-content-between align-items-center">
              <div class="text-muted">Персонаж</div>
              <div><a href="javascript:void(0)">{{ ticket.character.name }}</a></div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div class="text-muted">Создано</div>
              <div>{{ getDate(ticket.createdAt) }}</div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div class="text-muted">Обновлено</div>
              <div>{{ getDate(ticket.updatedAt) }}</div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-center align-items-center text-center">
              <b-btn v-if="!isCompleted" variant="primary" :disabled="submit" @click="completeTicket">Завершить</b-btn>
              <p v-else>Вы можете переоткрыть заявку, оставив комментарий к ней.</p>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </div>
    </div>
  </b-container>
</template>

<script>
import { contentService } from '@/services'
import { contentMixin } from '@/mixins/content'
import TicketComments from '@/components/tickets/TicketComments'

export default {
  name: 'TicketPage',
  mixins: [contentMixin],
  components: {
    TicketComments
  },
  data: () => ({
    ticket: {
      category: {},
      character: {}
    },
    statusCompleted: 5,
    statusArchived: 100,
    submit: false
  }),
  computed: {
    breadcrumb () {
      const ticketName = this.ticket && this.ticket.name ? this.ticket.name : 'Заявка'
      
      return [
        { text: 'Мои заявки', to: { name: 'tickets' }},
        { text: ticketName, active: true }
      ]
    },

    isArchived () {
      return this.ticket.status === this.statusArchived
    },

    isCompleted () {
      return this.ticket.status === this.statusCompleted || this.ticket.status === this.statusArchived
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
    next(vm => vm.setData(data))
  },
  methods: {
    setData (data) {
      document.title = data.name
      this.ticket = data
    },

    async reopenTicket () {
      const { data } = await contentService.getTicket(this.ticket.id)
      
      this.setData(data)
      this.$notify({ group: 'notifications', type: 'success', text: 'Тикет переоткрыт' })
    },

    showCiteButton (evt) {
      if (!this.isArchived) {
        this.$refs.citeButton.trigger(evt)
      }
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
