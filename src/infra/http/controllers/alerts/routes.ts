import { FastifyInstance } from 'fastify'
import { fetchUserAlertsController } from './fetch-user-alerts'
import { TokenVerification } from '../../middlewares/verify-jwt'
import { createAlertController } from './create-alert'
import { deleteAlertController } from './delete-alert'

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

  app.delete(
    'alert/:alertId',
    { onRequest: [TokenVerification.verifyJWT] },
    deleteAlertController,
  )
}
