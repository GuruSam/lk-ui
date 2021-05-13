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
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    showCiteBtn: false,
    selectedText: ''
  }),
  mounted () {
    document.addEventListener('click', () => {
      if (!document.getSelection().toString()) {
        this.showCiteBtn = false
      }
    })
  },
  methods: {
    trigger (evt) {
      if (document.getSelection().toString()) {
        this.show(evt)
        this.selectedText = document.getSelection().toString()
      }
    },

    show (evt) {
      this.$refs.button.style.top = `${evt.clientY - 30}px`
      this.$refs.button.style.left = `${evt.clientX - 25}px`
      this.showCiteBtn = true
    },

    cite () {
      const bq = `<blockquote>${this.selectedText}</blockquote><br>`
      const editor = document.querySelector('.ql-editor')
      editor.innerHTML = editor.innerHTML + bq
      
      this.showCiteBtn = false
      document.getSelection().removeAllRanges()
    }
  }
}
</script>

<style>
.cite-btn {
  position: fixed;
  cursor: pointer;
}
</style>
