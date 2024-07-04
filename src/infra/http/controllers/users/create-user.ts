import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateUserUseCase } from '../../../../domain/application/use-cases/factories/make-create-user-use-case'

const createUserBodySchema = z.object({
  userName: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
})

export async function CreateUserController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { userName, email, password } = createUserBodySchema.parse(request.body)

  try {
    const createUserUseCase = makeCreateUserUseCase()

    const result = await createUserUseCase.execute({
      userName,
      email,
      password,
    })

    if (result.isLeft()) {
      return response.status(409).send({ message: result.value.message })
    }

    return response.status(201).send()
  } catch (err) {
    return response.status(500).send()
  }
}
