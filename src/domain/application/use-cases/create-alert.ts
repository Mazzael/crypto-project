import { Alert } from '../../entities/alert'
import { AlertsRepository } from '../repositories/alerts-repository'
import { randomUUID } from 'node:crypto'
import { UsersRepository } from '../repositories/users-repository'
import { Either, left, right } from '../../../core/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CreateAlertUseCaseRequest {
  userId: string
  cryptoId: string
  targetPrice: number
}

type CreateQuestionUseCaseResponse = Either<
  ResourceNotFoundError,
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
    cryptoId,
    targetPrice,
  }: CreateAlertUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const alert = new Alert(randomUUID(), user, cryptoId, targetPrice)

    this.alertsRepository.create(alert)

    user.setAlert(alert)

    return right({ alert })
  }
}
