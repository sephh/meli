import _ from 'lodash'

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
  item = null

  constructor(response) {
    if (response.results) {
      this.initList(response.results || response)
    } else {
      this.initOne(response)
    }
  }

  initList(rawItems) {
    const itemsByAuthor = rawItems.reduce((current, item) => {
      const sellerId = item.seller.id
      const data = current[sellerId]

      if (data) {
        return {
          ...current,
          [sellerId]: {
            ...data,
            items: [...data.items, this.mapListItem(item)],
            categories: _.uniq([...data.categories, item.category_id])
          }
        }
      }

      return {
        ...current,
        [sellerId]: {
          author: sellerId,
          items: [this.mapListItem(item)],
          categories: [item.category_id]
        }
      }
    }, {})

    this.items = _.values(itemsByAuthor)
  }

  initOne(rawItem) {
    const sellerId = rawItem.seller_id

    this.item = {
      author: sellerId,
      item: this.mapItem(rawItem)
    }
  }

  /**
   * @description returns a Array of items
   * @returns {Promise<T>[]}
   */
  getItems() {
    return this.items
  }

  /**
   * @description returns one item
   */
  getItem() {
    return this.item
  }

  mapListItem(rawItem) {
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

  mapItem(rawItem) {
    const amount = rawItem.price
    const [picture] = rawItem.pictures

    return {
      id: rawItem.id,
      title: rawItem.title,
      price: {
        amount,
        currency: rawItem.currency_id,
        decimals: getDecimals(amount)
      },
      picture: picture.url,
      condition: rawItem.condition,
      free_shipping: rawItem.shipping.free_shipping,
      sold_quantity: rawItem.sold_quantity,
      description: ''
    }
  }
}
