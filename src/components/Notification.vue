<template>
  <transition name="fade-left">
    <notifications group="notifications" width="350px" :duration="-1">
      <template slot="body" slot-scope="props">
        <div class="media bg-dark text-white px-3 py-4 mb-2" :class="getBorderClass(props.item.type)" @click="props.close">
          <div class="media align-items-center w-100">
            <div class="mr-3">
              <span class="display-4 ion" :class="getIcon(props.item.type)"></span>
            </div>
            <div class="media-body">
              <div class="notification-title" v-if="props.item.title">{{ props.item.title }}</div>
              {{ props.item.text }}
            </div>
          </div>
        </div>
      </template>
    </notifications>
  </transition>
</template>

<style src="@/vendor/libs/vue-notification/vue-notification.scss" lang="scss"></style>

<script>
export default {
  name: 'Notification',
  mounted () {
    const groupBlock = document.querySelector('.vue-notification-group')
    groupBlock.style.top = '66px'
  },
  methods: {
    getBorderClass (type) {
      switch (type) {
        case 'success':
          return 'border-success'
        case 'error':
          return 'border-danger'
      }
    },

    getIcon (type) {
      switch (type) {
        case 'error':
          return 'ion-ios-sad text-danger'
        case 'success':
          return 'ion-ios-done-all text-success'
      }
    }
  }
}
</script>

<style>
.border-danger {
  border-left: 3px solid rgb(105, 4, 4);
}

.border-success {
  border-left: 3px solid #04692e;
}

.v-fade-left-enter-active,
.v-fade-left-leave-active,
.v-fade-left-move {
  transition: all 1s;
}

.v-fade-left-enter,
.v-fade-left-leave-to {
  opacity: 0;
  transform: translateX(500px) scale(0.2);
}
</style>
