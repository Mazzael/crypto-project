import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository'
import { FakeHasher } from '../../../../test/cryptography/fake-hasher'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakeHasher: FakeHasher

let sut: CreateUserUseCase

describe('Create User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakeHasher = new FakeHasher()

    sut = new CreateUserUseCase(inMemoryUsersRepository, fakeHasher)
  })

  it('should be able to create a new user', async () => {
    const result = await sut.execute({
      userName: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(result.isRight()).toBe(true)
    expect(result.value?.user).toEqual(inMemoryUsersRepository.items[0])
  })

  it('should hash user password upon registration', async () => {
    await sut.execute({
      userName: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    const hashedPassword = await fakeHasher.hash('123456')

    expect(inMemoryUsersRepository.items[0].passwordHash).toEqual(
      hashedPassword,
    )
  })
})
