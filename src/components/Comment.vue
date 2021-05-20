<template>
  <div class="media mb-3 comment">
    <div class="text-center">
      <img :src="comment.author.avatar" class="ui-w-40 rounded-circle" alt>
      <div class="text-muted small text-nowrap mt-2">
        {{ getCommentTime(comment.createdAt) }}
      </div>
    </div>
    <div class="media-body comment-text bg-lighter rounded py-2 px-3 ml-3">
      <div class="d-flex align-items-center mb-2">
        <div class="font-weight-semibold" :class="getCommentAuthorColor(comment.author.type)">{{ comment.author.name }}</div>
        <!-- <div class="text-muted small ml-2 font-italic font-weight-light">01 апреля 2021, 13:30</div> -->
        <b-badge v-if="comment.isNew" variant="primary" class="ml-auto mb-2">Новый</b-badge>
      </div>
      <div class="comment-text" v-html="comment.text" :data-author="comment.author.name" ></div>
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
      return dayjs.unix(ts).format('DD.MM.YY')
    },

    getCommentTime (ts) {
      return dayjs.unix(ts).format('HH:mm')
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
.comment-text blockquote {
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
