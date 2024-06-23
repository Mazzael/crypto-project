import { Either, right } from '../../../core/either'
import { User } from '../../entities/user'
import { HashGenerator } from '../cryptography/hash-generator'
import { UsersRepository } from '../repositories/users-repository'
import { randomUUID } from 'node:crypto'

interface CreateUserUseCaseRequest {
  userName: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Either<
  Error,
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

    if (userWithSameEmail || userWithSameUserName) {
      throw new Error('User already exists.')
    }

    const passwordHash = await this.hashGenerator.hash(password)

    const user = new User(randomUUID(), userName, email, passwordHash)

    this.usersRepository.create(user)

    return right({ user })
  }
}
