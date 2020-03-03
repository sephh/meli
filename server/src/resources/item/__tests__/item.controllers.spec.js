import controllers from '../item.controllers'
import { isFunction } from 'lodash'
import request from 'supertest'
import { app } from '../../../server'

describe('item controllers', () => {
  test('has controllers', () => {
    const methods = ['getItems', 'getItem']

    methods.forEach(name => expect(isFunction(controllers[name])).toBe(true))
  })

  test('should get a list of items', async () => {
    const res = await request(app).get('/api/items')
    const [item] = res.body.results

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('results')
    expect(item.items.length).toBeGreaterThan(0)
    expect(item).toHaveProperty('author')
    expect(item).toHaveProperty('items')
    expect(item).toHaveProperty('categories')
    expect(item).toHaveProperty('items.0.id')
    expect(item).toHaveProperty('items.0.title')
    expect(item).toHaveProperty('items.0.price')
    expect(item).toHaveProperty('items.0.picture')
    expect(item).toHaveProperty('items.0.condition')
    expect(item).toHaveProperty('items.0.free_shipping')
  }, 50000)

  test('should get one item', async () => {
    const itemId = 'MLA614344429'
    const res = await request(app).get(`/api/items/${itemId}`)
    const item = res.body.results

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('results')
    expect(item).toHaveProperty('author')
    expect(item).toHaveProperty('item')
    expect(item).toHaveProperty('item.id', itemId)
    expect(item).toHaveProperty('item.title')
    expect(item).toHaveProperty('item.price')
    expect(item).toHaveProperty('item.picture')
    expect(item).toHaveProperty('item.condition')
    expect(item).toHaveProperty('item.free_shipping')
    expect(item).toHaveProperty('item.description')
  }, 50000)
})
