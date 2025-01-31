import { api } from '../../lib/axios'
import { prisma } from '../../lib/prisma'
import { env } from '../../env/env'
import { CronJobInterface } from '../cron-job-interface'
import { PrismaAlertMapper } from '../../database/prisma/mappers/prisma-alert-mapper'
import { Alert } from '../../../domain/entities/alert'
import { UsersRepository } from '../../../domain/application/repositories/users-repository'
import { sendAlertMail } from '../../mail-sender/nodemailer'
import { ResourceNotFoundError } from '../../../domain/application/use-cases/errors/resource-not-found-error'

export class CronJob implements CronJobInterface {
  constructor(private usersRepository: UsersRepository) {}

  async getAlerts() {
    const alerts = await prisma.alert.findMany({
      where: {
        isActive: true,
      },
    })

    const domainAlerts = alerts.map((alert) => {
      return PrismaAlertMapper.toDomain({
        id: alert.id,
        userId: alert.userId,
        cryptoId: alert.cryptoId,
        targetPrice: alert.targetPrice,
        isActive: alert.isActive,
      })
    })

    return domainAlerts
  }

  getCryptoIdsFromAlerts(alerts: Alert[]): string[] {
    const alertsMap = new Map<string, Array<string>>()

    alerts.forEach((alert) => {
      if (alertsMap.get(alert.cryptoId)) {
        alertsMap.set(alert.cryptoId, [
          ...(alertsMap.get(alert.cryptoId) ?? []),
          alert.userId,
        ])
      } else {
        alertsMap.set(alert.cryptoId, [alert.userId])
      }
    })

    const iterator = alertsMap.keys()
    const cryptoIds = []

    for (const item of iterator) {
      cryptoIds.push(item)
    }

    return cryptoIds
  }

  async sendNotificationByCryptoPrices(cryptosIds: string[], alerts: Alert[]) {
    cryptosIds.forEach(async (cryptoId) => {
      try {
        const response = await api.get(
          `https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=${env.COINGECKO_API_KEY}&ids=${cryptoId}&vs_currencies=brl`,
        )

        const filteredAlerts = alerts.filter(
          (alert) => alert.cryptoId === cryptoId,
        )

        filteredAlerts.forEach(async (alert) => {
          if (alert.targetPrice > response.data[alert.cryptoId].brl) {
            const user = await this.usersRepository.findById(alert.userId)

            if (!user) {
              throw new ResourceNotFoundError()
            }

            await sendAlertMail(
              user.email,
              user.userName,
              alert.cryptoId,
              alert.targetPrice,
              response.data[alert.cryptoId].brl,
            )

            alert.inactivate()

            const prismaAlert = PrismaAlertMapper.toPrisma(alert)

            await prisma.alert.update({
              where: {
                id: alert.id,
              },

              data: prismaAlert,
            })
          }
        })
      } catch (error) {
        console.error(`Error when searching for crypto price: ${error}`)
      }
    })
  }
}
