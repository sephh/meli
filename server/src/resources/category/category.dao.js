import axios from 'axios'
import config from '../../config'

export default {
  /**
   * @description returns ML category by id
   * @param id
   * @returns {Promise<T>}
   */
  getOne(id) {
    return axios
      .get(`${config.mlBaseUrl}/categories/${id}`)
      .then(res => res.data)
  }
}
