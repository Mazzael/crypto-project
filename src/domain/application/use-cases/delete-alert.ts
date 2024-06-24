import { Either, left, right } from '../../../core/either'
import { AlertsRepository } from '../repositories/alerts-repository'
import { UsersRepository } from '../repositories/users-repository'
import { NotAllowedError } from './errors/not-allowed-error'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface DeleteAlertUseCaseRequest {
  userId: string
  alertId: string
}

type DeleteAlertUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  null
>

export class DeleteAlertUseCase {
  constructor(
    private alertsRepository: AlertsRepository,
    private usersRepository: UsersRepository,
  ) {}

  async execute({
    userId,
    alertId,
  }: DeleteAlertUseCaseRequest): Promise<DeleteAlertUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    const alert = await this.alertsRepository.findById(alertId)

    if (!alert) {
      return left(new ResourceNotFoundError())
    }

    if (user.id !== userId) {
      return left(new NotAllowedError())
    }

    this.alertsRepository.delete(alert)

    return right(null)
  }
}
