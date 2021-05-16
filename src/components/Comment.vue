<template>
  <div class="media mb-3">
    <div class="text-center">
      <img :src="comment.author.avatar" class="ui-w-40 rounded-circle" alt>
      <div class="text-muted small text-nowrap mt-2">{{ getCommentDate(comment.createdAt) }}</div>
    </div>
    <div class="media-body comment-text bg-lighter rounded py-2 px-3 ml-3">
      <div class="d-flex align-items-center">
        <div class="font-weight-semibold mb-2" :class="getCommentAuthorColor(comment.author.type)">{{ comment.author.name }}</div>
        <b-badge variant="primary" class="ml-auto mb-2">Новый</b-badge>
      </div>
      <div class="comment" v-html="comment.text" :data-author="comment.author.name" ></div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'CommentSection',
  props: {
    comment: Object
  },
  created () {
    this.parseBlockquotes()
  },
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

    parseBlockquotes () {
      const tempDiv = document.createElement('div')
      tempDiv.innerHTML = this.comment.text
      const bq = tempDiv.querySelectorAll('blockquote')

      bq.forEach((quote) => {
        if (quote.dataset.source) {
          const source = quote.dataset.source === 'desc' ? 'Из описания:' : quote.dataset.source + ' сказал(а):'
          const sourceBlock = `<span class="cite-source text-muted mb-2">${source}</span>`
          quote.insertAdjacentHTML('afterbegin', sourceBlock)
        }
      })

      this.comment.text = tempDiv.innerHTML
    }
  }
}
</script>

<style>
.comment blockquote {
  background-color: #1e1e21;
  border-left: 3px solid #a9a9a9;
  border-radius: 0.25rem;
  color: #a9a9a9;
  font-style: italic;
  padding: 0.5em 10px;
  quotes: "\201C""\201D""\2018""\2019";
}
.cite-source {
  display: block;
  font-size: 13px;
}
</style>
