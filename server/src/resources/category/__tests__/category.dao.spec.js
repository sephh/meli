import { isFunction } from 'lodash'

import CategoryDao from '../category.dao'

describe('category dao', () => {
  test('has methods', () => {
    const methods = ['getOne']

    methods.forEach(name => expect(isFunction(CategoryDao[name])).toBe(true))
  })

  test('should get category', async () => {
    const categoryId = 'MLA411940'
    const category = await CategoryDao.getOne(categoryId)

    expect(category).toBeTruthy()
    expect(category).toHaveProperty('id', categoryId)
    expect(category.path_from_root.length).toBeGreaterThan(0)
  }, 60000)
})
