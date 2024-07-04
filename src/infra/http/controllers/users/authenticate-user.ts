import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUserUseCase } from '../../../../domain/application/use-cases/factories/make-authenticate-user-use-case'

const authenticateUserBodySchema = z.object({
  userName: z.string(),
  password: z.string(),
})

export async function authenticateUserController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { userName, password } = authenticateUserBodySchema.parse(request.body)

  try {
    const authenticateUserUseCase = makeAuthenticateUserUseCase()

    const result = await authenticateUserUseCase.execute({
      userName,
      password,
    })

    if (result.isLeft()) {
      return response.status(400).send({ message: result.value.message })
    }

    const { user } = result.value

    const token = await response.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return response.status(200).send({ token })
  } catch (err) {
    console.log(err)
    return response.status(500).send()
  }
}
