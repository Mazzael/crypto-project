import { Alert } from '../../domain/entities/alert'

export abstract class CronJobInterface {
  abstract getAlerts(): Promise<Alert[]>
  abstract getCryptoIdsFromAlerts(alerts: Alert[]): string[]
  abstract sendNotificationByCryptoPrices(
    cryptosIds: string[],
    alerts: Alert[],
  ): Promise<void>
}
