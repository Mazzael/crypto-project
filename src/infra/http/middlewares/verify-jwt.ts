import { FastifyReply, FastifyRequest } from 'fastify'

export class TokenVerification {
  static async verifyJWT(request: FastifyRequest, reply: FastifyReply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      return reply.status(401).send({ message: 'Unauthorized.' })
    }
  }
}
