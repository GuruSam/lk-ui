import axios from 'axios'

class TicketService {
  constructor() {
    this.formMap = {
      'custom': 'CustomForm',
      'npc': 'NpcForm',
      'producer_alias': 'ProducerForm'
    }
  }

  /**
   * @param {String} handler 
   * @returns String
   */
  getForm (handler) {
    if (!handler) {
      return null
    }

    return this.formMap[handler]
  }
  
  /**
   * @param {String} handler 
   * @returns Promise
   */
  getFormOptions (handler) {
    switch (handler) {
      case 'npc':
        return this._getNpcFormOptions()
      case 'custom':
        return this._getCustomFormOptions()

      default:
        return {}
    }
  }

  /**
   * @param {String} handler 
   * @param {Number} categoryId 
   * @param {Object} formData 
   * @returns Object
   */
  createRequestData (formData, handler, categoryId) {
    let request = {}

    switch (handler) {
      case 'npc':
        request.name = 'Заявка на NPC ' + formData.name
        request.message = '*'
        request.data = formData
        break;
    
      default:
        request = formData
        request.data = {}
        break;
    }

    if (categoryId) {
      request.categoryId = categoryId
    }
    request.data.handler = handler

    return request
  }

  async _getCustomFormOptions () {
    const { data } = await axios.get('/tickets/form')

    return {
      characters: data.characters,
      categories: data.categories
    }
  }

  async _getNpcFormOptions () {
    const { data } = await axios.get('/npc/form')

    return {
      physiqueOptions: data.physics,
      classOptions: data.magicClass
    }
  }
}

export const ticketService = new TicketService()
