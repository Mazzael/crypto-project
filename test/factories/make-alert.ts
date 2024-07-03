import { Alert } from '../../src/domain/entities/alert'
import { faker } from '@faker-js/faker'
import { makeUser } from './make-user'
import { randomInt } from 'node:crypto'

interface AlertProps {
  id?: string
  userId?: string
  stockId?: string
  targetPrice?: number
}

export function makeAlert({ id, userId, stockId, targetPrice }: AlertProps) {
  const factoryUser = makeUser({})

  const alert = new Alert(
    id ?? faker.string.uuid(),
    userId ?? factoryUser.id,
    stockId ?? faker.internet.email(),
    targetPrice ?? randomInt(1000),
  )

  return alert
}
