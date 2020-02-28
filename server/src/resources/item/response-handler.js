import _ from 'lodash'
import AuthorDao from '../author/author.dao'

/**
 * @description get the number of decimals
 * @param amount
 * @returns {number}
 */
function getDecimals(amount) {
  const decimals = amount.toString().split('.')[1]
  return decimals ? decimals.length : 0
}

export default class ResponseHanlder {
  authorCache = {}
  items = []

  constructor(response) {
    this.init(response.results || response)
  }

  init(rawItems) {
    const itemsByAuthor = rawItems.reduce((current, item) => {
      const sellerId = item.seller.id
      const data = current[sellerId]

      if (data) {
        return {
          ...current,
          [sellerId]: {
            ...data,
            items: [...data.items, this.mapItem(item)]
          }
        }
      }

      return {
        ...current,
        [sellerId]: {
          author: this.getAuthor(sellerId).catch(() => ({})),
          items: [this.mapItem(item)]
        }
      }
    }, {})

    this.items = _.values(itemsByAuthor)
  }

  /**
   * @description returns a Array of items promise
   * @returns {Promise<T>[]}
   */
  getItems() {
    return this.items
  }

  async getAuthor(sellerId) {
    if (this.authorCache[sellerId]) {
      return this.authorCache[sellerId]
    }

    try {
      const author = await AuthorDao.getOne(sellerId)
      const [first, ...last] = author.nickname.split(' ')

      this.authorCache[sellerId] = {
        name: first,
        lastname: last ? last.join(' ') : ''
      }
      return this.authorCache[sellerId]
    } catch (e) {
      console.error(e)
      throw e
    }
  }

  mapItem(rawItem) {
    const amount = rawItem.price
    return {
      id: rawItem.id,
      title: rawItem.title,
      price: {
        amount,
        currency: rawItem.currency_id,
        decimals: getDecimals(amount)
      },
      picture: rawItem.thumbnail,
      condition: rawItem.condition,
      free_shipping: rawItem.shipping.free_shipping
    }
  }
}
