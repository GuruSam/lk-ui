<template>
  <notifications group="notifications" width="350px">
    <template slot="body" slot-scope="props">
      <div class="media bg-dark text-white px-3 py-4 mb-2" :class="getBorder(props.item.type)" @click="props.close">
        <div class="media align-items-center w-100">
          <div class="mr-3">
            <span class="display-4 ion" :class="getIcon(props.item.type)"></span>
          </div>
          <div class="media-body">
            <strong>{{ props.item.title }}</strong><br>
            {{ props.item.text }}
          </div>
        </div>
      </div>
    </template>
  </notifications>
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
    getBorder (type) {
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
      }
    }
  }
}
</script>

<style>
.border-danger {
  border-left: 3px solid rgb(105, 4, 4);
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
