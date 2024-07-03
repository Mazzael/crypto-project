import { AlertsRepository } from '../../../../domain/application/repositories/alerts-repository'
import { Alert } from '../../../../domain/entities/alert'
import { PrismaAlertMapper } from '../mappers/prisma-alert-mapper'
import { PrismaService } from '../prisma-service'

export class PrismaAlertsRepository implements AlertsRepository {
  constructor(private prisma: PrismaService) {}

  async create(alert: Alert): Promise<void> {
    const data = PrismaAlertMapper.toPrisma(alert)

    this.prisma.alert.create({
      data,
    })
  }

  async findById(id: string): Promise<Alert | null> {
    const alert = await this.prisma.alert.findUnique({
      where: {
        id,
      },
    })

    if (!alert) {
      return null
    }

    return PrismaAlertMapper.toDomain(alert)
  }

  async findManyByUserId(
    userId: string,
    filterByActive: boolean,
  ): Promise<Alert[] | null> {
    let alerts

    if (filterByActive) {
      alerts = await this.prisma.alert.findMany({
        where: {
          userId,
          isActive: true,
        },
      })
    } else {
      alerts = await this.prisma.alert.findMany({
        where: {
          userId,
        },
      })
    }

    if (!alerts) {
      return null
    }

    return alerts.map((alert) =>
      PrismaAlertMapper.toDomain({
        id: alert.id,
        userId: alert.userId,
        cryptoId: alert.cryptoId,
        targetPrice: alert.targetPrice,
        isActive: alert.isActive,
      }),
    )
  }

  async delete(alert: Alert): Promise<void> {
    const data = PrismaAlertMapper.toPrisma(alert)

    await this.prisma.alert.delete({
      where: {
        id: data.id,
      },
    })
  }
}
