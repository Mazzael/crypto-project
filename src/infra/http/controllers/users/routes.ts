import { FastifyInstance } from 'fastify'
import { CreateUserController } from './create-user'
import { authenticateUserController } from './authenticate-user'

export async function userRoutes(app: FastifyInstance) {
  app.post('/users', CreateUserController)
  app.post('/auth', authenticateUserController)
}
