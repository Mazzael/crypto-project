import { AlertsRepository } from '../../src/domain/application/repositories/alerts-repository'
import { Alert } from '../../src/domain/entities/alert'

export class InMemoryAlertsRepository implements AlertsRepository {
  public items: Alert[] = []

  async findById(id: string) {
    const alert = this.items.find((item) => item.id === id)

    if (!alert) {
      return null
    }

    return alert
  }

  async findManyByUserId(userId: string, filterByActive: boolean) {
    const alerts = this.items.filter((item) => item.userId === userId)

    if (!filterByActive) {
      return alerts
    }

    return alerts.filter((alert) => alert.isActive === true)
  }

  async create(alert: Alert) {
    this.items.push(alert)
  }

  async delete(alert: Alert) {
    const itemIndex = this.items.findIndex((item) => item.id === alert.id)

    this.items.splice(itemIndex, 1)
  }
}
