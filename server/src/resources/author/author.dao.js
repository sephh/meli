import axios from 'axios'
import config from '../../config'

export default {
  /**
   * @description returns ML user by id
   * @param id
   * @returns {Promise<T>}
   */
  getOne(id) {
    return axios.get(`${config.mlBaseUrl}/users/${id}`).then(res => res.data)
  }
}
