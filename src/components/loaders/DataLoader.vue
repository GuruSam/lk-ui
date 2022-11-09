<template>
  <div class="d-flex justify-content-center align-items-center mb-4 mt-4">
    <div class="spinner-border text-primary" :class="{'spinner-border-sm' : small}">
      <span class="sr-only">Загружаю...</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataLoader',
  
  props: {
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
