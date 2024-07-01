import { Alert } from '@prisma/client'

export abstract class RoutineInterface {
  abstract getAlerts(): Promise<Alert[]>
  abstract checkCryptoPrices(
    cryptosIds: string[],
    alerts: Alert[],
  ): Promise<void>
}
