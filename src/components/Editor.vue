<template>
  <quill-editor ref="editor" v-model="content" />
</template>

<script>
export default {
  name: 'Editor',
  data: () => ({
    content: ''
  }),
  computed: {
    quill () {
      return this.$refs.editor.quill
    }
  },
  mounted () {
    this.$root.$on('quote', this.insertBlockquote)
  },
  beforeDestroy () {
    this.$root.$off('quote', this.insertBlockquote)
  },
  methods: {
    getContent () {
      return this.content
    },

    resetContent () {
      this.content = ''
    },

    insertBlockquote (source, text) {
      const length = this.quill.getLength()
      const index = length === 1 ? 0 : length
      this.quill.insertEmbed(index, 'blockquote', { text, source }, 'user')
      if (index > 0) {
        this.quill.insertEmbed(this.quill.getLength(), 'break', true, 'user')
      }
    }
  }
}
</script>
