import Vue from 'vue'
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

  getTicketComments (id, limit, offset) {
    const params = { limit, offset }
    return axios.get(`/tickets/${id}/comments`, { params })
  }

  getTicketForm () {
    return axios.get('/tickets/form')
  }

  createTicket (data) {
    return axios.post('/tickets', data)
  }

  completeTicket (id) {
    return axios.post(`/tickets/${id}/complete`)
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

  readTicketComments (ticketId, comments) {
    return axios.post(`/tickets/${ticketId}/comments/read/bulk`, comments)
  }

  getCharacters () {
    return axios.get('/characters')
  }

  addToFavorites (character) {
    axios.post(`/characters/${character.id}/favorite`)
      .then(() => {
        character.isFavorite = true
        Vue.notify({ group: 'notifications', type: 'success', text: `${character.name} добавлен(а) в избранные` })
      })
  }

  removeFromFavorites (character) {
    axios.delete(`/characters/${character.id}/favorite`)
      .then(() => {
        character.isFavorite = false
        Vue.notify({ group: 'notifications', type: 'success', text: `${character.name} удален(а) из избранных` })
      })
  }
}
