<template>
  <div v-show="showCiteBtn" class="badge badge-primary cite-btn" ref="citeButton" @click.stop="cite" @mouseup.stop @touchend.stop>
    Цитировать
  </div>
</template>

<script>
export default {
  name: 'CiteButton',

  data: () => ({
    showCiteBtn: false,
    selectedText: '',
    source: 'desc',
    quotableElements: []
  }),

  computed: {
    parentElement () {
      return this.$parent.$el
    }
  },

  mounted () {
    document.addEventListener('mouseup', this.onMouseUp)
    document.addEventListener('touchend', this.onMouseUp)
    document.addEventListener('mousedown', () => {
      if (!document.getSelection().isCollapsed) {
        document.getSelection().empty()
      }
    })
  },

  methods: {
    onMouseUp (evt) {
      const selection = document.getSelection()

      if (!selection.isCollapsed) {
        const anchorNode = selection.anchorNode
        const quotable = evt.target.closest('.quotable')

        if (quotable && quotable.contains(anchorNode)) {
          this.trigger(evt, quotable.dataset.source)
        }

      } else if (this.showCiteBtn) {
        this.hide()
      }
    },

    trigger (evt, source) {
      this.selectedText = document.getSelection().toString()

      if (this.selectedText) {
        this.show(evt)
        this.source = source ?? 'Цитата'
      }
    },

    show (evt) {
      const coords = evt.changedTouches ? evt.changedTouches.item(0) : evt
      const x = (coords.clientX - 30) || (coords.x - 30)
      const y = (coords.clientY - 35) || (coords.y - 35)

      this.$refs.citeButton.style.top = `${y}px`
      this.$refs.citeButton.style.left = `${x}px`
      this.showCiteBtn = true
    },

    hide () {
      this.showCiteBtn = false
      this.selectedText = null
      this.source = null
    },

    cite () {
      this.$root.$emit('quote', this.source, this.selectedText)
      this.showCiteBtn = false

      document.getSelection().empty()
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
