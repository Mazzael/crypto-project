import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticateUser } from '../../../../../test/utils/create-and-authenticate-user'

describe('Create Alert (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create an alert', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post('/alerts')
      .set('Authorization', `Bearer ${token}`)
      .send({
        cryptoId: 'Dogecoin',
        targetPrice: 123,
      })

    expect(response.statusCode).toEqual(201)
  })
})
