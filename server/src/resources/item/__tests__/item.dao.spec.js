import ItemDao from '../item.dao'

describe('item dao', () => {
  const id = 'MLA614344429'

  test('should get items', async () => {
    const data = await ItemDao.getAll('comp')

    expect(data).toBeTruthy()
    expect(data).toHaveProperty('results')
    expect(data.results.length).toBeGreaterThan(0)
  }, 60000)

  test('should get item by id', async () => {
    const data = await ItemDao.getOne(id)

    expect(data).toBeTruthy()
    expect(data).toHaveProperty('id', id)
  }, 60000)

  test('should get item description', async () => {
    const data = await ItemDao.getItemDescription(id)

    expect(data).toBeTruthy()
    expect(data).toHaveProperty('text')
    expect(data).toHaveProperty('plain_text')
  }, 60000)
})
