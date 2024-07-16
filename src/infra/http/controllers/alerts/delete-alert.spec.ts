import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from '../../../app'
import { createAndAuthenticateUser } from '../../../../../test/utils/create-and-authenticate-user'
import { prisma } from '../../../lib/prisma'

describe('Delete Alert (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete an alert', async () => {
    const { token, user } = await createAndAuthenticateUser(app)

    const alert = await prisma.alert.create({
      data: {
        cryptoId: 'Dogecoin',
        isActive: true,
        targetPrice: 123456,
        userId: user.id,
      },
    })

    const response = await request(app.server)
      .delete(`/alert/${alert.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(204)
  })
})
