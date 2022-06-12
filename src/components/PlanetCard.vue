<template>
  <div class="card mb-4">
    <div class="card-header info-header info-header--full text-center">
      <slot name="header"></slot>
    </div>
    <div class="card-body info-message">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanetCard'
}
</script>

<style scoped>
.info-message {
  font-weight: 300;
  font-size: 16px;
}

.info-header {
  background-image: linear-gradient(to bottom, rgb(56 56 56 / 50%), rgb(18 18 20)), url(/images/irtmis_bg.jpg);
  background-size: cover;
  background-position: center 25%;
  border-bottom: none !important;
  line-height: 1.1 !important;
}

.info-header--full {
  min-height: 125px;
}
</style>
