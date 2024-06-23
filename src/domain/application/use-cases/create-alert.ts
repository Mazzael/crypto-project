import { Alert } from '../../entities/alert'
import { AlertsRepository } from '../repositories/alerts-repository'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../repositories/users-repository'
import { Either, right } from '../../../core/either'

interface CreateAlertUseCaseRequest {
  userId: string
  stockId: string
  targetPrice: number
}

type CreateQuestionUseCaseResponse = Either<
  Error,
  {
    alert: Alert
  }
>

export class CreateAlertUseCase {
  constructor(
    private alertsRepository: AlertsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    stockId,
    targetPrice,
  }: CreateAlertUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      throw new Error('User not found.')
    }

    const alert = new Alert(randomUUID(), user, stockId, targetPrice)

    this.alertsRepository.create(alert)

    return right({ alert })
  }
}
