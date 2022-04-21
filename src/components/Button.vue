<template>
  <button class="btn btn-primary" :disabled="loading" @click="$emit('click', $event)">
    <slot></slot>
    <span v-if="loading" aria-hidden="true" class="ml-1 spinner-border" />
  </button>
</template>

<script>
export default {
  name: 'Button',

  props: {
    loading: Boolean
  }
}
</script>
