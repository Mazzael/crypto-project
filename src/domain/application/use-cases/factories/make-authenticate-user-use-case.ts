import { BcryptHasher } from '../../../../infra/cryptography/bcrypt-hasher'
import { PrismaService } from '../../../../infra/database/prisma/prisma-service'
import { PrismaUsersRepository } from '../../../../infra/database/prisma/repositories/prisma-users-repository'
import { AuthenticateUserUseCase } from '../authenticate-user'

const prisma = new PrismaService()

export function makeAuthenticateUserUseCase() {
  const usersRepository = new PrismaUsersRepository(prisma)
  const hashComparer = new BcryptHasher()
  const authenticateUserUseCase = new AuthenticateUserUseCase(
    usersRepository,
    hashComparer,
  )

  return authenticateUserUseCase
}
