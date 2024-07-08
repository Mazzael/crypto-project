import { EventInterface } from '../../../../core/event/event-interface'

export class CryptoPriceReachedEvent implements EventInterface {
  dataTimeOccurred: Date
  eventData: any

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date()
    this.eventData = eventData
  }
}
