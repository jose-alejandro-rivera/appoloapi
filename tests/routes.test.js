const request = require('supertest')
const app = require('../app')


describe('Get Endpoints', () => {
  it('should create a new get', async () => {
    const res = await request(app)
      .get('/flujo')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
  })
})