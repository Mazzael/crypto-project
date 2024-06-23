import { Alert } from '../../src/domain/entities/alert'
import { faker } from '@faker-js/faker'
import { User } from '../../src/domain/entities/user'
import { makeUser } from './make-user'
import { randomInt } from 'node:crypto'

interface AlertProps {
  id?: string
  user?: User
  stockId?: string
  targetPrice?: number
}

export function makeAlert({ id, user, stockId, targetPrice }: AlertProps) {
  const factoryUser = makeUser({})

  const alert = new Alert(
    id ?? faker.string.uuid(),
    user ?? factoryUser,
    stockId ?? faker.internet.email(),
    targetPrice ?? randomInt(1000),
  )

  return alert
}
