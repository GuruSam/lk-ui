<template>
  <b-card header="Комментарии" header-tag="h6" class="mb-4" no-body>
    <DataLoader v-if="pending" />
    <b-card-body v-else-if="comments.length" @mouseup="showCiteButton">
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
      <b-btn class="mt-4" variant="primary">Отправить</b-btn>
    </b-card-footer>
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
import DataLoader from '../loaders/DataLoader'
import { contentService } from '@/services'

export default {
  name: 'TicketComments',
  props: {
    showEditor: Boolean
  },
  components: {
    Comment, CiteButton, quillEditor, DataLoader
  },
  data: () => ({
    newComment: '',
    comments: [],
    total: 0,
    pending: true,
    editorOptions: quillOptions,

    currentPage: 1,
    perPage: 10
  }),
  mounted () {
    this.fetchComments()
      .finally(() => this.pending = false)
  },
  methods: {
    fetchComments () {
      const params = { 
        limit: this.perPage,
        offset: this.currentPage * this.perPage - this.perPage
      }

      return contentService.getTicketComments(this.$route.params.id, params)
        .then(({ data }) => {
          this.comments = data.items
          this.total = data.total
        })
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
    }
  }
}
</script>
