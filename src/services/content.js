import axios from 'axios'
import store from '@/store'

export default class ContentService {
  constructor () {
    this._defaultLimit = 12
    this._defaultOffset = 0
  }

  getDashboardInfo () {
    return axios.get('/dashboard')
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

  submitTicketComment (id, message) {
    const comment = {
      text: message,
      author: {
        name: store.state.user.username,
        avatar: store.state.user.avatar,
        type: 'producer'
      }
    }

    return axios.post(`/tickets/${id}/comments`, {
      params: { id },
      message
    })
      .then(({ data }) => {
        comment.createdAt = data.createdAt
        return Promise.resolve(comment)
      })
  }

  getCharacters () {
    return axios.get('/characters')
  }
}
