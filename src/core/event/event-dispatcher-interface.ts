import { EventHandlerInterface } from './event-handler-interface'
import { EventInterface } from './event-interface'

export interface EventDispatcherInterface {
  notify(event: EventInterface): Promise<void>
  register(eventName: string, eventHandler: EventHandlerInterface): void
  unregister(eventName: string, eventHandler: EventHandlerInterface): void
  unregisterAll(): Promise<void>
}
