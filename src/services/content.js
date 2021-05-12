import axios from 'axios'

export default class ContentService {
  getDashboardInfo () {
    return axios.get('/dashboard', { withCredentials: true })
  }

  getTicketsList (params) {
    params.type = params.type ?? 'all'
    params.limit = params.limit ?? 12
    params.offset = params.offset ?? 0
    params.needFilters = true

    return axios.get('/tickets', { params })
  }

  getTicket (id) {
    return axios.get(`/tickets/${id}`)
  }

  getTicketComments (id, params = {}) {
    params.limit = params.limit ?? 12
    params.offset = params.offset ?? 0

    return axios.get(`/tickets/${id}/comments`, { params })
  }
}
