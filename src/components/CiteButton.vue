<template>
  <b-badge 
    v-show="showCiteBtn"
    ref="button"
    class="cite-btn"
    :class="{ 'p-2' : breakpoint.isXs }"
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
    selectedText: '',
    source: 'desc'
  }),
  mounted () {
    document.addEventListener('click', () => {
      if (!document.getSelection().toString() && this.showCiteBtn) {
        this.showCiteBtn = false
      }
    })
  },
  methods: {
    trigger (evt, source) {
      if (document.getSelection().toString()) {
        this.show(evt)
        this.selectedText = document.getSelection().toString()

        if (source) {
          this.source = source
        }
      }
    },

    show (evt) {
      const x = (evt.clientX - 30) || (evt.x - 30)
      const y = (evt.clientY - 35) || (evt.y - 35)

      this.$refs.button.style.top = `${y}px`
      this.$refs.button.style.left = `${x}px`
      this.showCiteBtn = true
    },

    cite () {
      const bq = `<blockquote data-source="${this.source}">${this.selectedText}</blockquote><br>`
      const editor = document.querySelector('.ql-editor')
      
      editor.innerHTML = editor.textContent ? editor.innerHTML + bq : bq
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
