<template>
  <div class="col-sm-12 col-md-6 col-lg-6 col-xl-12">
    <div class="card border-0 text-white mb-4" :class="{ 'bg-primary' : light }">
      <div class="card-body d-flex align-items-center">
        <span 
          class="display-2 ion" 
          :class="cardIcon"
        ></span>
        <div class="ml-3">
          <div class="display-4">{{ number }}</div>
          <div class="opacity-75">{{ text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'info-card',
  props: {
    light: Boolean,
    number: {
      type: Number,
      default: 0
    },
    text: String,
    icon: String
  },
  computed: {
    cardIcon () {
      if (this.icon) {
        return `ion-${this.icon}`
      }

      return 'ion-ios-contacts'
    }
  }
}
</script>
