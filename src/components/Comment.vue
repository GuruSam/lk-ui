<template>
  <div class="media mb-3">
    <div v-if="!breakpoint.isXs" class="text-center">
      <img :src="comment.author.avatar" class="ui-w-40 rounded-circle" alt>
    </div>
    <div class="media-body comment-text bg-lighter rounded py-2 px-3" :class="{ 'ml-3' : !breakpoint.isXs }">
      <div class="d-flex align-items-center mb-2">
        <div id="username" class="font-weight-semibold" :class="getCommentAuthorColor(comment.author.type)">{{ comment.author.name }}</div>
        <div class="text-muted small ml-2 font-italic">{{ getCommentDate(comment.createdAt) }}</div>
        <b-badge v-if="comment.isNew" variant="primary" class="mb-2 ml-auto">Новый</b-badge>
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
      return dayjs.unix(ts).format('DD MMM YYYY, HH:mm')
    },

    getCommentAuthorColor (type) {
      switch (type) {
        case 'producer':
          return 'text-primary'
        case 'gm':
          return 'text-danger'
        case 'system':
          return 'text-success'
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
