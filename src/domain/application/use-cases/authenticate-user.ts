import { Either, left, right } from '../../../core/either'
import { User } from '../../entities/user'
import { HashComparer } from '../cryptography/hash-comparer'
import { UsersRepository } from '../repositories/users-repository'
import { WrongCreadentialsError } from './errors/wrong-credentials-error'

interface AuthenticateUserUseCaseRequest {
  userName: string
  password: string
}

type AtuhenticateUserUseCaseResponse = Either<
  WrongCreadentialsError,
  {
    user: User
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
  ) {}

  async execute({
    userName,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AtuhenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByUserName(userName)

    if (!user) {
      return left(new WrongCreadentialsError())
    }

    const isPasswordValid = await this.hashComparer.compare(
      password,
      user.passwordHash,
    )

    if (!isPasswordValid) {
      return left(new WrongCreadentialsError())
    }

    return right({ user })
  }
}
