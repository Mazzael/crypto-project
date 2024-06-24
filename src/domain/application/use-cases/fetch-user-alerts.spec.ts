import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUserAlertsUseCase } from './fetch-user-alerts'
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository'
import { InMemoryAlertsRepository } from '../../../../test/repositories/in-memory-alerts-repository'
import { makeUser } from '../../../../test/factories/make-user'
import { makeAlert } from '../../../../test/factories/make-alert'

let inMemoryAlertsRepository: InMemoryAlertsRepository
let inMemoryUsersRepository: InMemoryUsersRepository

let sut: FetchUserAlertsUseCase

describe('Fetch user Alerts', () => {
  beforeEach(() => {
    inMemoryAlertsRepository = new InMemoryAlertsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()

    sut = new FetchUserAlertsUseCase(inMemoryAlertsRepository)
  })

  it('should be able to fetch user alerts', async () => {
    const user = makeUser({
      id: '1',
    })

    await inMemoryUsersRepository.create(user)

    const alert1 = makeAlert({
      user,
    })

    const alert2 = makeAlert({
      user,
    })

    const alert3 = makeAlert({
      user,
    })

    await inMemoryAlertsRepository.create(alert1)
    await inMemoryAlertsRepository.create(alert2)
    await inMemoryAlertsRepository.create(alert3)

    const result = await sut.execute({
      userId: '1',
      filterByActive: true,
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.alerts).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _user: user,
          _id: alert1.id,
        }),
        expect.objectContaining({
          _user: user,
          _id: alert2.id,
        }),
        expect.objectContaining({
          _user: user,
          _id: alert3.id,
        }),
      ]),
    )
  })
})
