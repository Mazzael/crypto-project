import { Alert } from '../../entities/alert'
import { AlertsRepository } from '../repositories/alerts-repository'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../repositories/users-repository'

interface CreateAlertUseCaseRequest {
  userId: string
  cryptoId: string
  targetPrice: number
}

interface CreateQuestionUseCaseResponse {
  alert: Alert
}

export class CreateAlertUseCase {
  constructor(
    private alertsRepository: AlertsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    cryptoId,
    targetPrice,
  }: CreateAlertUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    const alert = new Alert(randomUUID(), user, cryptoId, targetPrice)

    this.alertsRepository.create(alert)

    return {
      alert,
    }
  }
}
