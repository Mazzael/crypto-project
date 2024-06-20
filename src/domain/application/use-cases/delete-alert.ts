import { AlertsRepository } from '../repositories/alerts-repository'
import { UsersRepository } from '../repositories/users-repository'

interface DeleteAlertUseCaseRequest {
  userId: string
  alertId: string
}

export class DeleteAlertUseCase {
  constructor(
    private alertsRepository: AlertsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({ userId, alertId }: DeleteAlertUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    const alert = await this.alertsRepository.findById(alertId)

    if (!alert) {
      throw new Error('Alert not found.')
    }

    if (user.id !== userId) {
      throw new Error('Not allowed')
    }

    this.alertsRepository.delete(alert)
  }
}
