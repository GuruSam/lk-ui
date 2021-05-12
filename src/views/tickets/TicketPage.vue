<template>
  <b-container fluid>
    <h4 class="py-3 mb-4">
      <b-breadcrumb :items="breadcrumb" class="font-weight-bold m-0" />
    </h4>

    <b-row>
      <b-col>
        <b-card header="Описание" header-tag="h6" class="mb-4">
          <div v-html="ticket.description" class="ticket-desc"></div>
          <!-- <CiteButton ref="citeButton" /> -->
        </b-card>

        <b-card header="Обсуждение" header-tag="h6" class="mb-4" no-body>
          <div v-if="commentsPending" class="d-flex justify-content-center mb-4 mt-4">
            <b-spinner variant="primary" label="Spinning"></b-spinner>
          </div>

          <b-card-body v-else-if="comments.length">
            <div v-for="comment in comments" :key="comment.createdAt" class="media mb-3">
              <div class="text-center">
                <img :src="comment.author.avatar" class="ui-w-40 rounded-circle" alt>
                <div class="text-muted small text-nowrap mt-2">{{ getCommentDate(comment.createdAt) }}</div>
              </div>
              <div class="media-body bg-lighter rounded py-2 px-3 ml-3">
                <div class="font-weight-semibold mb-2" :class="getCommentAuthorColor(comment.author.type)">{{ comment.author.name }}</div>
                {{ comment.text }}
              </div>
            </div>
          </b-card-body>
          <b-card-body v-else>
            <p class="text-muted">У этой заявки еще нет обсуждений</p>
          </b-card-body>
          <b-card-footer v-if="!commentsPending">
            <quillEditor v-model="comment" :options="editorOptions" />
            <b-btn class="mt-4" variant="primary">Отправить</b-btn>
          </b-card-footer>
        </b-card>
      </b-col>

      <b-col md="4" xl="3">
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
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div class="text-muted">Персонаж</div>
              <div><a href="javascript:void(0)">{{ ticket.character.name }}</a></div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div class="text-muted">Дата создания</div>
              <div>{{ getDate(ticket.createdAt) }}</div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-between align-items-center">
              <div class="text-muted">Дата обновления</div>
              <div>{{ getDate(ticket.updatedAt) }}</div>
            </b-list-group-item>
            <b-list-group-item class="d-flex justify-content-center align-items-center">
              <b-btn variant="primary">Завершить</b-btn>
            </b-list-group-item>
          </b-list-group>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<style src="quill/dist/quill.core.css"></style>
<style src="quill/dist/quill.snow.css"></style>
<style src="@/plugins/editor/styles.css"></style>

<script>
import { contentService } from '@/services'
import { contentMixin } from '@/mixins/content'
import { quillEditor } from 'vue-quill-editor'
import { quillOptions } from '@/plugins/editor/options'
// import CiteButton from '@/components/CiteButton'
import dayjs from 'dayjs'

export default {
  name: 'TicketPage',
  mixins: [contentMixin],
  components: {
    quillEditor
  },
  data: () => ({
    ticket: {
      category: {},
      character: {}
    },
    comments: [],
    commentsTotal: null,
    commentsPending: true,
    comment: '',
    editorOptions: quillOptions
  }),
  computed: {
    breadcrumb () {
      const ticketName = this.ticket && this.ticket.name ? this.ticket.name : 'Заявка'
      
      return [
        { text: 'Мои заявки', to: { name: 'tickets' }},
        { text: ticketName, active: true }
      ]
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
  mounted () {
    contentService.getTicketComments(this.$route.params.id)
      .then(({ data }) => {
        this.comments = data.items
        this.commentsTotal = data.total
        this.commentsPending = false
      })
  },
  methods: {
    setData (data) {
      document.title = data.name
      this.ticket = data
    },

    showCite (evt) {
      if (document.getSelection().toString()) {
        this.$refs.citeButton.show(evt)
      }
    },

    getCommentDate (ts) {
      return dayjs.unix(ts).format('HH:mm')
    },

    getCommentAuthorColor (type) {
      switch (type) {
        case 'producer':
          return 'text-primary'
        case 'gm':
        case 'system':
          return 'text-danger'
      }
    } 
  }
}
</script>

<style>
.status-block {
  background-image: linear-gradient( #12121473, #12121473 ),url(https://playlabirint.ru/img/bg3.jpg);
  background-size: cover;
}
.ticket-desc { 
  color: #d4d4d4;
}
.cite-btn {
  position: fixed;
}
</style>
