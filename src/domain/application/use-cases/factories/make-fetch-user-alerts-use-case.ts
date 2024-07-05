import { PrismaService } from '../../../../infra/database/prisma/prisma-service'
import { PrismaAlertsRepository } from '../../../../infra/database/prisma/repositories/prisma-alerts-repository'
import { FetchUserAlertsUseCase } from '../fetch-user-alerts'

const prisma = new PrismaService()

export function makeFetchUserAlertsUserUseCase() {
  const alertsRepository = new PrismaAlertsRepository(prisma)
  const fetchUserAlertsUseCase = new FetchUserAlertsUseCase(alertsRepository)

  return fetchUserAlertsUseCase
}
