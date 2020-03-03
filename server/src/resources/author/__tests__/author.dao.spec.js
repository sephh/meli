import { isFunction } from 'lodash'

import AuthorDao from '../author.dao'

describe('author dao', () => {
  test('has methods', () => {
    const methods = ['getOne']

    methods.forEach(name => expect(isFunction(AuthorDao[name])).toBe(true))
  })

  test('should get author', async () => {
    const author = await AuthorDao.getOne(10506835)

    expect(author).toBeTruthy()
    expect(author).toHaveProperty('id')
    expect(author).toHaveProperty('nickname')
  }, 60000)
})
