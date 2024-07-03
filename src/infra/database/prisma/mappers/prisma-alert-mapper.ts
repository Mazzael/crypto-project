import { Alert as PrismaAlert } from '@prisma/client'
import { Alert } from '../../../../domain/entities/alert'

export class PrismaAlertMapper {
  static toDomain(raw: PrismaAlert): Alert {
    const alert = new Alert(raw.id, raw.userId, raw.cryptoId, raw.targetPrice)

    return alert
  }

  static toPrisma(alert: Alert): PrismaAlert {
    return {
      id: alert.id,
      userId: alert.userId,
      cryptoId: alert.cryptoId,
      targetPrice: alert.targetPrice,
      isActive: alert.isActive,
    }
  }
}
