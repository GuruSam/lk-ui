<template>
  <b-card :header="header" header-tag="h6" class="mb-4" no-body>
    <div v-if="pending" class="d-flex justify-content-center mb-4 mt-4">
      <b-spinner variant="primary" label="Spinning"></b-spinner>
    </div>

    <b-card-body v-else-if="comments.length" @mouseup="showCiteButton">
      <div v-for="comment in comments" :key="comment.createdAt" class="media mb-3">
        <div class="text-center">
          <img :src="comment.author.avatar" class="ui-w-40 rounded-circle" alt>
          <div class="text-muted small text-nowrap mt-2">{{ getCommentDate(comment.createdAt) }}</div>
        </div>
        <div class="media-body comment-text bg-lighter rounded py-2 px-3 ml-3">
          <div class="font-weight-semibold mb-2" :class="getCommentAuthorColor(comment.author.type)">{{ comment.author.name }}</div>
          <div class="comment" v-html="comment.text"></div>
        </div>
      </div>
      <CiteButton ref="citeButton" />
    </b-card-body>
    <b-card-body v-else>
      <p class="text-muted text-italic">Комментариев еще нет.</p>
    </b-card-body>
    <b-card-footer v-if="!pending">
      <quillEditor ref="editor" v-model="comment" :options="editorOptions" />
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
import dayjs from 'dayjs'
import CiteButton from './CiteButton'

export default {
  name: 'CommentSection',
  components: {
    quillEditor, CiteButton
  },
  props: {
    header: {
      type: String,
      default: 'Комментарии'
    },
    comments: {
      type: Array,
      default: () => []
    },
    total: Number,
    pending: Boolean
  },
  data: () => ({
    comment: '',
    editorOptions: quillOptions
  }),
  methods: {
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
    },

    showCiteButton (evt) {
      if (evt.target.classList.contains('comment') || evt.target.parentNode.classList.contains('comment')) {
        this.$refs.citeButton.trigger(evt)
      }
    }
  }
}
</script>

<style>
.comment blockquote {
  background-color: #1e1e21;
  border-left: 5px solid #a9a9a9;
  color: #a9a9a9;
  font-style: italic;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";
}</style>
