import { beforeEach, describe, expect, it } from 'vitest'
import { CreateAlertUseCase } from './create-alert'
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository'
import { InMemoryAlertsRepository } from '../../../../test/repositories/in-memory-alerts-repository'
import { makeUser } from '../../../../test/factories/make-user'

let inMemoryAlertsRepository: InMemoryAlertsRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: CreateAlertUseCase

describe('Create Alert', () => {
  beforeEach(() => {
    inMemoryAlertsRepository = new InMemoryAlertsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new CreateAlertUseCase(
      inMemoryAlertsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to create an alert', async () => {
    const user = makeUser({
      id: '1',
    })

    inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      userId: '1',
      cryptoId: '2',
      targetPrice: 15,
    })

    console.log(result.value.alert)
    expect(result.isRight()).toBe(true)
    expect(result.value?.alert).toEqual(inMemoryAlertsRepository.items[0])
    expect(user.alerts).toHaveLength(1)
  })
})
