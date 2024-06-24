import { Either, left, right } from '../../../core/either'
import { User } from '../../entities/user'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users-repository'
import { randomUUID } from 'node:crypto'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface CreateUserUseCaseRequest {
  userName: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  UserAlreadyExistsError,
  {
    user: User
  }
>

export class CreateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    userName,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)
    const userWithSameUserName =
      await this.usersRepository.findByUserName(userName)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    if (userWithSameUserName) {
      return left(new UserAlreadyExistsError(userName))
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const user = new User(randomUUID(), userName, email, passwordHash)

    await this.usersRepository.create(user)

    return right({ user })
  }
}
