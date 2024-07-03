import { User as PrismaUser } from '@prisma/client'
import { User } from '../../../../domain/entities/user'

export class PrismaUserMapper {
  static toDomain(raw: PrismaUser): User {
    const user = new User(raw.id, raw.userName, raw.email, raw.password)

    return user
  }

  static toPrisma(user: User): PrismaUser {
    return {
      id: user.id,
      userName: user.userName,
      email: user.email,
      password: user.passwordHash,
    }
  }
}
