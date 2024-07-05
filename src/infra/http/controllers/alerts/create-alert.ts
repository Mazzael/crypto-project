import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCreateAlertUseCase } from '../../../../domain/application/use-cases/factories/make-create-alert-use-case'

const createAlertBodySchema = z.object({
  cryptoId: z.string(),
  targetPrice: z.number(),
})

export async function createAlertController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { cryptoId, targetPrice } = createAlertBodySchema.parse(request.body)

  try {
    const createAlertUseCase = makeCreateAlertUseCase()

    const result = await createAlertUseCase.execute({
      userId: request.user.sub,
      cryptoId,
      targetPrice,
    })

    if (result.isLeft()) {
      return response.status(404).send({ message: result.value.message })
    }

    return response.status(201).send()
  } catch (err) {
    return response.status(500).send()
  }
}
