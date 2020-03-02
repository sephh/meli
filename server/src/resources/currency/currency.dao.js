import axios from 'axios'
import config from '../../config'

export default {
  /**
   * @description returns ML currency
   * @param currency
   * @returns {Promise<T>}
   */
  getOne(currency) {
    return axios
      .get(`${config.mlBaseUrl}/currencies/${currency}`)
      .then(res => res.data)
  }
}
