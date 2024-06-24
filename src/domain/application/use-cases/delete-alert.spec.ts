import { beforeEach, describe, expect, it } from 'vitest'
import { DeleteAlertUseCase } from './delete-alert'
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository'
import { InMemoryAlertsRepository } from '../../../../test/repositories/in-memory-alerts-repository'
import { makeUser } from '../../../../test/factories/make-user'
import { makeAlert } from '../../../../test/factories/make-alert'

let inMemoryAlertsRepository: InMemoryAlertsRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: DeleteAlertUseCase

describe('Delete Alert', () => {
  beforeEach(() => {
    inMemoryAlertsRepository = new InMemoryAlertsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new DeleteAlertUseCase(
      inMemoryAlertsRepository,
      inMemoryUsersRepository,
    )
  })

  it('should be able to delete an alert', async () => {
    const user = makeUser({
      id: '1',
    })

    await inMemoryUsersRepository.create(user)

    const alert = makeAlert({
      id: '2',
      user,
    })

    await inMemoryAlertsRepository.create(alert)

    const result = await sut.execute({
      userId: '1',
      alertId: '2',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAlertsRepository.items).toHaveLength(0)
  })

  it('should not be able to delete another user alert', async () => {
    const user = makeUser({
      id: '1',
    })

    await inMemoryUsersRepository.create(user)

    const alert = makeAlert({
      id: '2',
      user,
    })

    await inMemoryAlertsRepository.create(alert)

    const result = await sut.execute({
      userId: '2',
      alertId: '2',
    })

    expect(result.isLeft()).toBe(true)
    expect(inMemoryAlertsRepository.items).toHaveLength(1)
  })
})
