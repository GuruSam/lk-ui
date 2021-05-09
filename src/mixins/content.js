const ticketStatus = {
  1: 'Создано',
  2: 'В обработке',
  3: 'Ждёт ответа ГМ',
  4: 'Ждёт вашего ответа',
  5: 'Завершено',
  100: 'В архиве'
}

export const contentMixin = {
  data: () => ({
    ticketStatus
  }),
  methods: {
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
