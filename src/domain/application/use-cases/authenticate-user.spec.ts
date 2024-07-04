import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUserUseCase } from './authenticate-user'
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository'
import { FakeHasher } from '../../../../test/cryptography/fake-hasher'
import { makeUser } from '../../../../test/factories/make-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher

let sut: AuthenticateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()

    sut = new AuthenticateUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to authenticate an user', async () => {
    const user = makeUser({
      userName: 'John Doe',
      passwordHash: await fakeHasher.hash('123456'),
    })

    await inMemoryUsersRepository.create(user)

    const result = await sut.execute({
      userName: 'John Doe',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value).toEqual({ user })
  })

  it('should not be able to authenticate with wrong credentials', async () => {
    const user = makeUser({
      userName: 'JDoe',
      passwordHash: await fakeHasher.hash('123456'),
    })

    inMemoryUsersRepository.create(user)

    const resultWrongUserName = await sut.execute({
      userName: 'JD',
      password: '123456',
    })

    expect(resultWrongUserName.isLeft()).toBe(true)

    const resultWrongPassword = await sut.execute({
      userName: 'JDoe',
      password: '1234',
    })

    expect(resultWrongPassword.isLeft()).toBe(true)
  })
})
