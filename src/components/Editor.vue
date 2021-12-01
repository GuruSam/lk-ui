<template>
  <quill-editor ref="editor" v-model="content" :disabled="disabled" :class="{ 'extended': extended }" />
</template>

<style src="quill/dist/quill.core.css"></style>
<style src="quill/dist/quill.snow.css"></style>
<style src="@/plugins/editor/styles.css"></style>

<script>
export default {
  name: 'Editor',
  props: {
    disabled: {
      type: Boolean, 
      default: false
    },
    extended: {
      type: Boolean,
      default: false
    }
  },
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
      if (this.quill.getText().trim().length > 0) {
        return this.content
      }

      return ''
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
