<template>
  <b-badge 
    v-show="showCiteBtn"
    ref="button"
    class="cite-btn" 
    variant="primary" 
    @click="cite"
  >
    Цитировать
  </b-badge>
</template>

<script>
export default {
  name: 'CiteButton',
  data: () => ({
    showCiteBtn: false
  }),
  created () {
    document.addEventListener('click', () => {
      if (!document.getSelection().toString()) {
        this.showCiteBtn = false
      }
    })
  },
  methods: {
    show (evt) {
      this.$refs.button.$el.style.top = `${evt.clientY - 30}px`
      this.$refs.button.$el.style.left = `${evt.clientX - 25}px`
      this.showCiteBtn = true
    },

    cite () {
      this.showCiteBtn = false
      document.getSelection().removeAllRanges()
    }
  }
}
</script>
