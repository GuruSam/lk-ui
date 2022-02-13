<template>
  <div class="lab-background d-none d-lg-block">
    <div class="lab-background-image"></div>
  </div>
</template>

<script>
export default {
  name: 'LabBackground'
}
</script>

<style>
.lab-background {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  overflow: hidden;
  z-index: -1;
}

.lab-background-image {
  position: relative;
}

.lab-background-image::before {
  content: '';
  display: block;
  height: calc(50vw);
  background-image: url(/images/lab-background.jpg);
  background-size: cover;
  background-position: 50% 0;
  background-repeat: no-repeat;
}

.lab-background-image::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50%;
  background-image: linear-gradient(to bottom, rgba(17, 17, 17, 0) 0, #141414 95%);
}
</style>
