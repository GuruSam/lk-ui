<template>
  <CommentSection :comments="comments" :total="total" :pending="pending" />
</template>

<script>
import CommentSection from '../CommentSection'
import { contentService } from '@/services'

export default {
  name: 'TicketComments',
  components: {
    CommentSection
  },
  data: () => ({
    comments: [],
    total: 0,
    pending: true
  }),
  mounted () {
    contentService.getTicketComments(this.$route.params.id)
      .then(({ data }) => {
        this.comments = data.items
        this.total = data.total
        this.pending = false
      })
  }
}
</script>
