import { beforeEach, describe, expect, it } from 'vitest'
import { CreateUserUseCase } from './create-user'
import { InMemoryUsersRepository } from '../../../../test/repositories/in-memory-users-repository'
import { FakeHasher } from '../../../../test/cryptography/fake-hasher'
import { makeUser } from '../../../../test/factories/make-user'

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

  it('should not be able to create an user with same email or user name', async () => {
    const user = makeUser({
      email: 'johndoe@example.com',
      userName: 'JDoe',
    })

    await inMemoryUsersRepository.create(user)

    const resultSameEmail = await sut.execute({
      userName: 'askdjkd',
      email: 'johndoe@example.com',
      password: '123456',
    })

    expect(resultSameEmail.isLeft()).toBe(true)

    const resultSameUserName = await sut.execute({
      userName: 'JDoe',
      email: 'email@email.com',
      password: '123456',
    })

    expect(resultSameUserName.isLeft()).toBe(true)
  })
})
