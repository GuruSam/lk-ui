<template>
  <b-card header="Комментарии" header-tag="h6" class="mb-4 comment-section" no-body>
    <b-overlay :show="pending" spinner-variant="primary" bg-color="#121214">
      <b-card-body v-if="comments.length" @mouseup="showCiteButton">
        <Comment v-for="comment in comments" :key="comment.createdAt" :comment="comment" />
        <b-pagination class="justify-content-center justify-content-sm-end m-0"
          v-if="total > perPage"
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          @input="setPage"
          size="sm" />
        <CiteButton ref="citeButton" />
      </b-card-body>
      <b-card-body v-else>
        <p class="text-muted text-italic">Комментариев еще нет.</p>
      </b-card-body>
      <b-card-footer v-if="!pending && showEditor">
        <Editor ref="editor" :disabled="submit" />
        <b-btn class="mt-4" variant="primary" :disabled="submit" @click="submitComment">
          Отправить
          <b-spinner v-if="submit" class="ml-1"></b-spinner>
        </b-btn>
      </b-card-footer>
    </b-overlay>
  </b-card>
</template>

<script>
import CiteButton from '../CiteButton'
import Comment from '../Comment'
import Editor from '../Editor'
import { contentService } from '@/services'

export default {
  name: 'TicketComments',
  props: {
    showEditor: Boolean,
    ticketId: Number,
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    Comment, CiteButton, Editor
  },
  data: () => ({
    comments: [],
    pending: true,
    submit: false,

    currentPage: 1,
    perPage: 5
  }),
  mounted () {
    if (this.total) {
      const page = Math.ceil(this.total / this.perPage)
      this.setPage(page)
    } else {
      this.fetchComments()
    }

    document.querySelector('.comment-section').addEventListener('pointerup', this.showCiteButton)
  },
  methods: {
    fetchComments () {
      this.pending = true
      const offset = this.currentPage * this.perPage - this.perPage

      return contentService.getTicketComments(this.$route.params.id, this.perPage, offset)
        .then(({ data }) => {
          this.comments = data.items
          this.$emit('update:total', data.total)
        })
        .finally(() => this.pending = false)
    },

    showCiteButton (evt) {
      const comment = evt.target.closest('.comment')
      
      if (comment && this.showEditor) {
        this.$refs.citeButton.trigger(evt, comment.dataset.author)
      }
    },

    setPage (page) {
      this.currentPage = page
      this.fetchComments()
    },

    submitComment () {
      this.submit = true
      const newComment = this.$refs.editor.getContent()

      contentService.submitTicketComment(this.ticketId, newComment)
        .then((comment) => {
          this.comments.push(comment)
          this.$refs.editor.resetContent()
        })
        .finally(() => {
          this.submit = false
        })
    }
  }
}
</script>
