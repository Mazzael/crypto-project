import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticateUser } from '../../../../../test/utils/create-and-authenticate-user'
import { prisma } from '../../../lib/prisma'

describe('Fetch User Alerts (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to fetch user alerts', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    await prisma.alert.createMany({
      data: [
        {
          cryptoId: 'Dogecoin',
          isActive: true,
          targetPrice: 123456,
          userId: user.id,
        },

        {
          cryptoId: 'bitcoin',
          isActive: true,
          targetPrice: 123456789,
          userId: user.id,
        },
      ],
    })

    const response = await request(app.server)
      .get('/alerts')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      alerts: [
        expect.objectContaining({
          _cryptoId: 'Dogecoin',
        }),
        expect.objectContaining({
          _cryptoId: 'bitcoin',
        }),
      ],
    })
  })
})
