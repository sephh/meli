import Utils from '../utils'

describe('item utils', () => {
  test('should parse author data', async () => {
    const author = await Utils.getAuthor(10506835)
    expect(author.name).toBeTruthy()
    expect(author).toHaveProperty('name')
    expect(author).toHaveProperty('lastname')
  }, 60000)

  test('should get item description', async () => {
    const description = await Utils.getDescription('MLA614344429')

    expect(description).toBeTruthy()
  }, 60000)
})
