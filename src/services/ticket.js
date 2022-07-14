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
   * @param {Number} categoryId 
   * @param {Object} formData 
   * @returns Object
   */
  createRequestData (formData, handler, categoryId) {
    let request = {}

    switch (handler) {
      case 'npc':
        request = this.createNpcRequest(formData)
        break;
      case 'producer_alias':
        request = this.createProducerRequest(formData)
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

  /**
   * @param {Object} formData 
   * @returns 
   */
  createNpcRequest (formData) {
    return {
      name: 'Заявка на NPC ' + formData.name,
      message: '*',
      data: formData
    }
  }

  /**
   * @param {Object} formData 
   * @returns 
   */
  createProducerRequest (formData) {
    return {
      name: 'Заявка на создание продюсера ' + formData.username,
      message: '*',
      data: formData
    }
  }
}

export const ticketService = new TicketService()
