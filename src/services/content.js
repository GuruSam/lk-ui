import axios from 'axios'

export default class ContentService {
  getDashboardInfo () {
    return axios.get('/dashboard', { withCredentials: true })
  }

  getTicketsList (params) {
    params.type = params.type ?? 'all'
    params.limit = params.limit ?? -1
    params.offset = params.offset ?? 0

    return axios.get('/tickets', { params })
  }
}
