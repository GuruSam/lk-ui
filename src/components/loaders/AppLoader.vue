<template>
  <div class="block-screen">
    <div class="sk-chase sk-primary sk-center">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>
  </div>
</template>

<style src="@/vendor/libs/spinkit/spinkit.scss" lang="scss"></style>

<script>
export default {
  name: 'AppLoader'
}
</script>

<style>
.block-screen {
  display: flex;
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #141414;
  z-index: 100;
}
</style>
