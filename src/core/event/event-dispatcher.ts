import { EventDispatcherInterface } from './event-dispatcher-interface'
import { EventHandlerInterface } from './event-handler-interface'
import { EventInterface } from './event-interface'

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {}

  get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
    return this.eventHandlers
  }

  register(eventName: string, eventHandler: EventHandlerInterface): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = []
    }
    this.eventHandlers[eventName].push(eventHandler)
  }

  unregister(eventName: string, eventHandler: EventHandlerInterface): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler)
      if (index !== -1) {
        this.eventHandlers[eventName].splice(index, 1)
      }
    }
  }

  async unregisterAll(): Promise<void> {
    this.eventHandlers = {}
  }

  async notify(event: EventInterface): Promise<void> {
    const eventName = event.constructor.name
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach(async (eventHandler) => {
        await eventHandler.handle(event)
      })
    }
  }
}
