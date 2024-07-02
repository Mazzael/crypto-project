import { Alert } from '@prisma/client'

export abstract class CronJobInterface {
  abstract getAlerts(): Promise<Alert[]>
  abstract checkCryptoPrices(
    cryptosIds: string[],
    alerts: Alert[],
  ): Promise<void>
}
