import { FastifyInstance } from 'fastify'
import { fetchUserAlertsController } from './fetch-user-alerts'
import { TokenVerification } from '../../middlewares/verify-jwt'
import { createAlertController } from './create-alert'

export async function alertRoutes(app: FastifyInstance) {
  app.post(
    '/alerts',
    { onRequest: [TokenVerification.verifyJWT] },
    createAlertController,
  )
  app.get(
    '/alerts',
    { onRequest: [TokenVerification.verifyJWT] },
    fetchUserAlertsController,
  )
}
