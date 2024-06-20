import { Alert } from '../../entities/alert'

export abstract class AlertsRepository {
  abstract findById(id: string): Promise<Alert | null>
  abstract findByUserId(
    userId: string,
    filterByActive: boolean,
  ): Promise<Alert[] | null>

  abstract create(alert: Alert): Promise<void>
  abstract delete(alert: Alert): Promise<void>
}
