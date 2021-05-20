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
        <quillEditor ref="editor" v-model="newComment" :options="editorOptions" />
        <b-btn class="mt-4" variant="primary" :disabled="submit" @click="submitComment">Отправить</b-btn>
      </b-card-footer>
    </b-overlay>
  </b-card>
</template>

<style src="quill/dist/quill.core.css"></style>
<style src="quill/dist/quill.snow.css"></style>
<style src="@/plugins/editor/styles.css"></style>

<script>
import { quillEditor } from 'vue-quill-editor'
import { quillOptions } from '@/plugins/editor/options'
import CiteButton from '../CiteButton'
import Comment from '../Comment'
import { contentService } from '@/services'

export default {
  name: 'TicketComments',
  props: {
    showEditor: Boolean,
    id: Number
  },
  components: {
    Comment, CiteButton, quillEditor
  },
  data: () => ({
    newComment: '',
    comments: [],
    total: 0,
    pending: true,
    editorOptions: quillOptions,
    submit: false,

    currentPage: 1,
    perPage: 10
  }),
  mounted () {
    this.fetchComments()
    document.querySelector('.comment-section').addEventListener('pointerup', this.showCiteButton)

    // let lastMove = null
    // document.querySelector('.comment-section').addEventListener('touchstart', (evt) => {
    //   lastMove = evt
    // })
    // document.querySelector('.comment-section').addEventListener('touchend', () => {
    //   this.showCiteButton(lastMove)
    // })
  },
  methods: {
    fetchComments () {
      this.pending = true
      const params = { 
        limit: this.perPage,
        offset: this.currentPage * this.perPage - this.perPage
      }

      return contentService.getTicketComments(this.$route.params.id, params)
        .then(({ data }) => {
          this.comments = data.items
          this.total = data.total
        })
        .finally(() => this.pending = false)
    },

    showCiteButton (evt) {
      const comment = evt.target.closest('.comment')
      
      if (comment) {
        this.$refs.citeButton.trigger(evt, comment.dataset.author)
      }
    },

    setPage (page) {
      this.currentPage = page
      this.fetchComments()
    },

    submitComment () {
      this.submit = true 

      contentService.submitTicketComment(this.id, this.newComment)
        .then((comment) => {
          this.comments.push(comment)
          this.newComment = ''
        })
        .finally(() => this.submit = false)
    }
  }
}
</script>
