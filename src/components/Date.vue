<template>
  <span>{{ textDate }}</span>
</template>

<script>
import dayjs from 'dayjs'

export default {
  name: 'Date',
  props: {
    // Unix timestamp
    value: [String, Number],
    format: {
      type: String,
      default: 'DD MMMM YYYY, HH:mm'
    }
  },

  data: () => ({
    now: Date.now(),
    interval: null
  }),

  computed: {
    isSameHour () {
      this.now
      return dayjs().diff(dayjs.unix(this.value), 'hour') ? false : true
    },

    textDate () {
      const format = dayjs().isSame(dayjs.unix(this.value), 'day') ? 'Сегодня, HH:mm' : this.format

      return this.isSameHour 
        ? dayjs.unix(this.value).fromNow() 
        : dayjs.unix(this.value).format(format)
    }
  },

  created() {
    if (this.isSameHour) {
      this.interval = setInterval(() => {
        this.isSameHour ? this.now = Date.now() : clearInterval(this.interval)
      }, 60000)
    }
  }
}
</script>
