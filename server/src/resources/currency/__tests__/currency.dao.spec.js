import { isFunction } from 'lodash'

import AuthorDao from '../currency.dao'

describe('currency dao', () => {
  test('has methods', () => {
    const methods = ['getOne']

    methods.forEach(name => expect(isFunction(AuthorDao[name])).toBe(true))
  })

  test('should get currency', async () => {
    const currency = await AuthorDao.getOne('ARS')

    expect(currency).toBeTruthy()
    expect(currency).toHaveProperty('id')
    expect(currency).toHaveProperty('symbol')
    expect(currency).toHaveProperty('description')
    expect(currency).toHaveProperty('decimal_places')
  }, 60000)
})
