import { User } from '../../src/domain/entities/user'
import { faker } from '@faker-js/faker'

interface UserProps {
  id?: string
  userName?: string
  email?: string
  passwordHash?: string
}

export function makeUser({ id, userName, email, passwordHash }: UserProps) {
  const user = new User(
    id ?? faker.string.uuid(),
    userName ?? faker.person.fullName(),
    email ?? faker.internet.email(),
    passwordHash ?? faker.internet.password(),
  )

  return user
}
