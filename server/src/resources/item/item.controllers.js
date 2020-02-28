import ItemDao from './item.dao'
import ResponseHanlder from './response-handler'

export default {
  /**
   * @description controller to get items
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  getItems: async (req, res) => {
    try {
      const { q } = req.query
      const data = await ItemDao.getAll(q)

      if (!data) {
        return res.status(400).end()
      }

      const reponseItems = new ResponseHanlder(data).getItems()
      const items = await Promise.all(
        reponseItems.map(async item => ({ ...item, author: await item.author }))
      )

      res.status(200).json({ data: items })
    } catch (e) {
      console.error(e)
      res.status(400).end()
    }
  },

  /**
   * @description controller to get item by id
   * @param req
   * @param res
   * @returns {Promise<*>}
   */
  getItem: async (req, res) => {
    try {
      const { id } = req.params
      const data = await ItemDao.getOne(id)

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
