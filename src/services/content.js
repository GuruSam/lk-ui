import axios from 'axios'

export default class ContentService {
  getDashboardInfo () {
    return axios.get('/dashboard')
  }
}
