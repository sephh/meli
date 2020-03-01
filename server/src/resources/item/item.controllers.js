import ItemDao from './item.dao'
import ResponseHanlder from './response-handler'
import Utils from './utils'

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
        reponseItems.map(async item => ({
          ...item,
          author: await Utils.getAuthor(item.author),
          categories: await Utils.getCategories(item.categories)
        }))
      )

      res.status(200).json({ results: items })
    } catch (e) {
      console.error(e)
      res.status(400).end(JSON.stringify(e))
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

      const resItem = new ResponseHanlder(data).getItem()

      const [author, description] = await Promise.all([
        Utils.getAuthor(resItem.author),
        Utils.getDescription(id)
      ])

      const item = {
        ...resItem,
        author,
        item: {
          ...resItem.item,
          description
        }
      }

      res.status(200).json({ results: item })
    } catch (e) {
      console.error(e)
      res.status(400).end(JSON.stringify(e))
    }
  }
}
