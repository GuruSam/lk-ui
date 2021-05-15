import axios from 'axios'

export default class ContentService {
  constructor () {
    this._defaultLimit = 12
    this._defaultOffset = 0
  }

  getDashboardInfo () {
    return axios.get('/dashboard', { withCredentials: true })
  }

  getTicketsList (params) {
    params.type = params.type ?? 'all'
    params.limit = params.limit ?? this._defaultLimit
    params.offset = params.offset ?? this._defaultOffset
    params.needFilters = true

    return axios.get('/tickets', { params })
  }

  getTicket (id) {
    return axios.get(`/tickets/${id}`)
  }

  getTicketComments (id, params = {}) {
    return axios.get(`/tickets/${id}/comments`, { params })
  }

  getCharacters (type) {
    return axios.get('/characters', { params: { type } })
  }
}
