import router from '../item.router'

describe('item router', () => {
  test('has routes', () => {
    const routes = [
      { path: '/', method: 'get' },
      { path: '/:id', method: 'get' }
    ]

    routes.forEach(route => {
      const match = router.stack.find(
        s => s.route.path === route.path && s.route.methods[route.method]
      )
      expect(match).toBeTruthy()
    })
  })
})
