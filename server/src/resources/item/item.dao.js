import axios from 'axios'
import config from '../../config'

export default {
  /**
   * @description returns ML items
   * @param query
   * @returns {Promise<T>}
   */
  getAll(query) {
    return axios
      .get(`${config.mlBaseUrl}/sites/MLA/search?q=${query}`)
      .then(res => res.data)
  },

  /**
   * @description returns ML item by id
   * @param id
   * @returns {Promise<T>}
   */
  getOne(id) {
    return axios.get(`${config.mlBaseUrl}/items/${id}`).then(res => res.data)
  }
}
