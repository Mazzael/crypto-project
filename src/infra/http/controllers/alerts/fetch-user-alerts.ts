import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeFetchUserAlertsUserUseCase } from '../../../../domain/application/use-cases/factories/make-fetch-user-alerts-use-case'

const fetchUserAlertsQuerySchema = z.object({
  filterByActive: z.boolean().default(true),
})

export async function fetchUserAlertsController(
  request: FastifyRequest,
  response: FastifyReply,
) {
  const { filterByActive } = fetchUserAlertsQuerySchema.parse(request.query)

  const fetchUserAlertsUseCase = makeFetchUserAlertsUserUseCase()

  try {
    const result = await fetchUserAlertsUseCase.execute({
      userId: request.user.sub,
      filterByActive,
    })

    if (result.isLeft()) {
      response.status(404).send({ message: result.value.message })
    }

    response.status(200).send(result.value)
  } catch (err) {
    return response.status(500).send()
  }
}
