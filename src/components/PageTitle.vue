<template>
  <div class="page-title py-2">
    <div v-if="title" class="heading">
      <h1 class="h3 m-0 font-weight-light">{{ title }}</h1>
      <span v-if="subTitle" class="text-muted">{{ subTitle }}</span>
    </div>

    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'PageTitle',

  props: {
    title: String,
    subTitle: String
  }
}
</script>

<style>
.page-title {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.heading {
  margin-bottom: 1rem;
}

@media (min-width: 576px) {
  .page-title {
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.5rem;
    text-align: left;
  }

  .heading {
    margin-bottom: 0;
  }
}
</style>
