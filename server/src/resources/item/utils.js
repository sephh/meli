import AuthorDao from '../author/author.dao'
import ItemDao from './item.dao'
import CategoryDao from '../category/category.dao'
import CurrencyDao from '../currency/currency.dao'

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
      return {
        name: 'John',
        lasname: 'Doe'
      }
    }
  },

  getPrice: async price => {
    try {
      const currency = await CurrencyDao.getOne(price.currency)

      return {
        ...price,
        decimals: currency.decimal_places,
        currency: currency.symbol
      }
    } catch (e) {
      console.error(e)
      return {
        ...price,
        decimals: 2,
        currency: '$'
      }
    }
  },

  getDescription: async id => {
    try {
      const { plain_text, text } = await ItemDao.getItemDescription(id)

      return plain_text || text
    } catch (e) {
      console.error(e)
      return 'Oops. Looks like the seller forgot the description.'
    }
  },

  getCategories: async categories => {
    try {
      let categoryId = ''
      let currentCount = 0

      for (const category in categories) {
        if (categories[category] > currentCount) {
          currentCount = categories[category]
          categoryId = category
        }
      }

      const { path_from_root } = await CategoryDao.getOne(categoryId)

      return path_from_root.map(p => p.name)
    } catch (e) {
      console.error(e)
      return []
    }
  }
}
