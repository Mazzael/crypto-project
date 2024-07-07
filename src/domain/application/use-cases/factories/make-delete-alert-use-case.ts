import { PrismaService } from '../../../../infra/database/prisma/prisma-service'
import { PrismaAlertsRepository } from '../../../../infra/database/prisma/repositories/prisma-alerts-repository'
import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users-repository'
import { DeleteAlertUseCase } from '../delete-alert'

const prisma = new PrismaService()

export function makeDeleteAlertUseCase() {
  const alertsRepository = new PrismaAlertsRepository(prisma)
  const usersRepository = new PrismaUsersRepository(prisma)
  const deleteAlertUseCase = new DeleteAlertUseCase(
    alertsRepository,
    usersRepository,
  )

  return deleteAlertUseCase
}
