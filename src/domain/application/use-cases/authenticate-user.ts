import { Encrypter } from '../cryptography/encrypter'
import { HashComparer } from '../cryptography/hash-comparer'
import { UsersRepository } from '../repositories/users-repository'

interface AuthenticateUserUseCaseRequest {
  userName: string
  password: string
}

interface AtuhenticateUserUseCaseResponse {
  accessToken: string
}

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
      throw new Error('Wrong credentials.')
    }

    const isPasswordValid = this.hashComparer.compare(
      password,
      user.passwordHash,
    )

    if (!isPasswordValid) {
      throw new Error('Wrong credentials')
    }

    const accessToken = await this.encrypter.encrypt({
      sub: user.id,
    })

    return {
      accessToken,
    }
  }
}
