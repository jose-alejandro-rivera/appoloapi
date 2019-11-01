const request = require('supertest')
const app = require('../app')


describe('Get Endpoints', () => {
  it('should create a new get', async () => {
    const res = await request(app)
      .get('/flujo')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('data')
    //expect(data).toBeDefined()
    //expect(data.entity.name).toEqual('Koen van Gilst')
  })
})

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
      const res = await request(app)
      .post('/flujo/crear')
      .send({
        "NomFlujo":"Reconfiguracion Internet",
        "CodCategoriaFlujo":1,
        "CodPaso_Inicial":1,
        "Descripcion":"proceso realizado en casa",
        "Orden":1,
        "Activo":true,
        "Fecha":"2019-10-30T16:07:00",
        "Usuario":"soporte"
     })
      expect(res.statusCode).toEqual(200)
      expect(res).toHaveProperty('text','{\"status\":200,\"msg\":\"registro creado exitosamente\"}')
      //expect(isJSON(res)).toBe(true)
      //expect(data).toBeDefined()
      //expect(data.entity.name).toEqual('Koen van Gilst')
    })
  })