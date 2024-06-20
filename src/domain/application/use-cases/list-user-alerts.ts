import { Alert } from '../../entities/alert'
import { AlertsRepository } from '../repositories/alerts-repository'

interface ListUserAlertsUseCaseRequest {
  userId: string
  filterByActive: boolean
}

interface ListUserAlertsUseCaseResponse {
  alerts: Alert[]
}

export class ListUserAlertsUseCase {
  constructor(private alertsRepository: AlertsRepository) {}

  async execute({
    userId,
    filterByActive,
  }: ListUserAlertsUseCaseRequest): Promise<ListUserAlertsUseCaseResponse> {
    const alerts = await this.alertsRepository.findByUserId(
      userId,
      filterByActive,
    )

    if (!alerts || alerts.length === 0) {
      throw new Error('This user has no alerts.')
    }

    return {
      alerts,
    }
  }
}
