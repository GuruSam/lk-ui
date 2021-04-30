<template>
  <div class="block-screen">
    <b-container>
      <b-row class="vh-100 text-center" align-v="center">
        <b-col align-self="center">
          <div class="sk-fold sk-primary sk-center">
            <div class="sk-fold-cube"></div>
            <div class="sk-fold-cube"></div>
            <div class="sk-fold-cube"></div>
            <div class="sk-fold-cube"></div>
          </div>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<style src="@/vendor/libs/spinkit/spinkit.scss" lang="scss"></style>

<script>
export default {
  name: 'loader'
}
</script>

<style>
.block-screen {
  position: fixed;
  width: 100%;
  height: 100%;
  margin: 0;
  background-color: #141414;
  z-index: 100;
}
</style>
