export const contentMixin = {
  methods: {
    getTicketStatus (status) {
      switch (status) {
        case 1:
          return 'Создано'
        case 2:
          return 'В обработке'
        case 3:
          return 'Ждёт ответа ГМ'
        case 4: 
          return 'Ждёт вашего ответа'
        case 5:
          return 'Завершено'
        case 100:
          return 'В архиве'
      }
    },

    getTicketStatusColor (status, outline) {
      switch (status) {
        case 1:
          return outline ? 'badge-outline-primary' : 'badge-primary'
        case 2 || 5:
          return outline ? 'badge-outline-success' : 'badge-success'
        case 3:
          return outline ? 'badge-outline-warning' : 'badge-warning'
        case 4:
          return outline ? 'badge-outline-danger' : 'badge-danger'
        default:
          return 'badge-secondary'
      }
    }
  }
}
