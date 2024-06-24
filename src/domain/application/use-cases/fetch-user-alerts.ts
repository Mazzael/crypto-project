import { Either, left, right } from '../../../core/either'
import { Alert } from '../../entities/alert'
import { AlertsRepository } from '../repositories/alerts-repository'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface FetchUserAlertsUseCaseRequest {
  userId: string
  filterByActive: boolean
}

type FetchUserAlertsUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    alerts: Alert[]
  }
>

export class FetchUserAlertsUseCase {
  constructor(private alertsRepository: AlertsRepository) {}

  async execute({
    userId,
    filterByActive,
  }: FetchUserAlertsUseCaseRequest): Promise<FetchUserAlertsUseCaseResponse> {
    const alerts = await this.alertsRepository.findManyByUserId(
      userId,
      filterByActive,
    )

    if (!alerts || alerts.length === 0) {
      return left(new ResourceNotFoundError())
    }

    return right({ alerts })
  }
}
