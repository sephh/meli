import axios from 'axios'
import config from '../../config'



// function responseHandler(res) {
// //   const items = res.data.data.results;
// // //   return items.map((item) => (
// // //       {
// // // //   author: {
// // // //   name: String
// // // // lastname: String
// // // //   },
// // // //   categories: [String, String, String, ...],
// // // //       items: [
// // // //     {"id": String,
// // // //       "title": String,
// // // //       "price": {
// // // //         "currency": String,
// // // //         "amount": Number,
// // // //         "decimals": Number
// // // //       },
// // // // “picture”: String,
// // // //       "condition": String,
// // // //       "free_shipping": Boolean
// // // // }
// // //   ))
// }

export default {
  getItems: async (req, res) => {
    try {
      const { q } = req.query
      const data = await axios
        .get(`${config.mlBaseUrl}/sites/MLA/search?q=${q}`)
        .then(res => res.data)

      if (!data) {
        return res.status(400).end()
      }

      res.status(200).json({ data })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  },

  getItem: async (req, res) => {
    try {
      const { id } = req.params
      const data = await axios
        .get(`${config.mlBaseUrl}/items/${id}`)
        .then(res => res.data)

      if (!data) {
        return res.status(400).end()
      }

      res.status(200).json({ data })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  }
}
