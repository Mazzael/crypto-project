import { PrismaService } from '../../../../infra/database/prisma/prisma-service'
import { PrismaAlertsRepository } from '../../../../infra/database/prisma/repositories/prisma-alerts-repository'
import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users-repository'
import { CreateAlertUseCase } from '../create-alert'

const prisma = new PrismaService()

export function makeCreateAlertUseCase() {
  const alertsRepository = new PrismaAlertsRepository(prisma)
  const usersRepository = new PrismaUsersRepository(prisma)
  const createAlertUseCase = new CreateAlertUseCase(
    alertsRepository,
    usersRepository,
  )

  return createAlertUseCase
}
