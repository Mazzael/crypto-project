import { BcryptHasher } from '../../../../infra/cryptography/bcrypt-hasher'
import { PrismaService } from '../../../../infra/database/prisma/prisma-service'
import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users-repository'
import { CreateUserUseCase } from '../create-user'

const prisma = new PrismaService()

export function makeCreateUserUseCase() {
  const usersRepository = new PrismaUsersRepository(prisma)
  const hasheGenerator = new BcryptHasher()
  const createUserUseCase = new CreateUserUseCase(
    usersRepository,
    hasheGenerator,
  )

  return createUserUseCase
}
