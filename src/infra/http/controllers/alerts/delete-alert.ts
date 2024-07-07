import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeDeleteAlertUseCase } from '../../../../domain/application/use-cases/factories/make-delete-alert-use-case'
import { NotAllowedError } from '../../../../domain/application/use-cases/errors/not-allowed-error'
import { ResourceNotFoundError } from '../../../../domain/application/use-cases/errors/resource-not-found-error'

const deleteAnswerParamsSchema = z.object({
  alertId: z.string(),
})

export async function deleteAlertController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { alertId } = deleteAnswerParamsSchema.parse(request.params)

  const deleteAlertUseCase = makeDeleteAlertUseCase()

  try {
    const result = await deleteAlertUseCase.execute({
      userId: request.user.sub,
      alertId,
    })

    if (result.isLeft()) {
      if (result.value instanceof NotAllowedError) {
        return response.status(403).send({ message: result.value.message })
      }

      if (result.value instanceof ResourceNotFoundError) {
        return response.status(404).send({ message: result.value.message })
      }
    }

    return response.status(204).send()
  } catch (err) {
    return response.status(500).send()
  }
}
