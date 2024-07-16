import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'

describe('Create User (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an user', async () => {
    const response = await request(app.server).post('/users').send({
      userName: 'John Doe',
      email: 'johndoe@example.com',
      password: '1234567',
    })

    expect(response.statusCode).toEqual(201)
  })
})
