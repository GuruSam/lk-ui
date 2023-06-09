<template>
  <div class="comment-section card mb-4">
    <h6 class="card-header">Комментарии</h6>

    <b-overlay :show="pending" spinner-variant="primary" bg-color="#121214">
      <div v-if="comments.length" class="card-body">
        <Comment v-for="comment in comments" :key="comment.createdAt" :comment="comment" />

        <b-pagination class="justify-content-center justify-content-sm-end m-0"
          v-if="total > perPage"
          v-model="currentPage"
          :total-rows="total"
          :per-page="perPage"
          @input="openPage"
          size="sm" />
      </div>

      <div v-else class="card-body">
        <p class="text-muted text-italic">Комментариев еще нет.</p>
      </div>

      <div v-if="!pending && showEditor" class="card-footer">
        <Editor ref="editor" :disabled="submit" />

        <p v-if="error" class="text-danger mt-2 mb-0">{{ error }}</p>
        <Button class="mt-4" :loading="submit" @click="submitComment">Отправить</Button>
      </div>
    </b-overlay>
  </div>
</template>

<script>
import Comment from '../Comment'
import Editor from '../Editor'
import Button from '@/components/Button'
import { contentService } from '@/services'

export default {
  name: 'TicketComments',
  props: {
    showEditor: {
      type: Boolean,
      default: true
    },
    ticketId: Number,
    total: {
      type: Number,
      default: 0
    }
  },
  components: {
    Comment, Editor, Button
  },
  data: () => ({
    comments: [],
    pending: true,
    submit: false,

    currentPage: 1,
    perPage: 5,

    error: null
  }),
  mounted () {
    if (this.total) {
      const page = Math.ceil(this.total / this.perPage)

      this.openPage(page)
    } else {
      this.fetchComments()
    }
  },
  methods: {
    fetchComments () {
      this.pending = true
      const offset = this.currentPage * this.perPage - this.perPage

      return contentService.getTicketComments(this.$route.params.id, this.perPage, offset)
        .then(({ data }) => {
          this.comments = data.items
          this.$emit('update:total', data.total)
          this.checkForUnreadComments()
        })
        .finally(() => this.pending = false)
    },

    checkForUnreadComments () {
      const unread = this.comments
        .filter(comment => comment.isNew)
        .map(comment => comment.id)

      if (unread.length) {
        contentService.readTicketComments(this.ticketId, unread)
      }
    },

    openPage (page) {
      this.currentPage = page
      this.fetchComments()
    },

    submitComment () {
      const newComment = this.$refs.editor.getContent()

      if (!newComment) {
        return this.error = 'Напишите что-нибудь'
      }

      this.submit = true

      contentService.submitTicketComment(this.ticketId, newComment)
        .then(async comment => {
          this.comments.push(comment)
          this.$refs.editor.resetContent()

          if (this.$parent.isCompleted) {
            this.$parent.reopenTicket()
          }
        })
        .finally(() => {
          this.submit = false
          this.error = null
        })
    },

    insertBlockquote (source, text) {
      this.$refs.editor.insertBlockquote(source, text)
    }
  }
}
</script>
