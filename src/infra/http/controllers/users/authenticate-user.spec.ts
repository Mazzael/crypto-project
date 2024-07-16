import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'

describe('Authenticate User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an user', async () => {
    await request(app.server).post('/users').send({
      userName: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    })

    const response = await request(app.server).post('/auth').send({
      userName: 'John Doe',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
