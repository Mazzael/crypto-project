import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'
import { prisma } from '../../src/infra/lib/prisma'

export async function createAndAuthenticateUser(app: FastifyInstance) {
  const user = await prisma.user.create({
    data: {
      userName: 'John Doe',
      email: 'johndoe@example.com',
      password: await hash('1234567', 8),
    },
  })

  const authResponse = await request(app.server).post('/auth').send({
    userName: 'John Doe',
    password: '1234567',
  })

  const { token } = authResponse.body

  return {
    token,
    user,
  }
}
