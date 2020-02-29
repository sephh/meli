import AuthorDao from '../author/author.dao'
import ItemDao from './item.dao'

export default {
  getAuthor: async sellerId => {
    try {
      const author = await AuthorDao.getOne(sellerId)
      const [first, ...last] = author.nickname.split(' ')

      return {
        name: first,
        lastname: last ? last.join(' ') : ''
      }
    } catch (e) {
      console.error(e)
      throw e
    }
  },

  getDescription: async id => {
    try {
      const { plain_text, text } = await ItemDao.getItemDescription(id)

      return plain_text || text
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
