import { Either, left, right } from '../../../core/either'
import { Encrypter } from '../cryptography/encrypter'
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
    accessToken: string
  }
>

export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashComparer: HashComparer,
    private encrypter: Encrypter,
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

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
    })

    return right({ accessToken })
  }
}
