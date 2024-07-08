import { EventHandlerInterface } from '../../../../../core/event/event-handler-interface'
import { CryptoPriceReachedEvent } from '../crypto-price-reached-event'

export class CryptoPriceReachedHandler
  implements EventHandlerInterface<CryptoPriceReachedEvent>
{
  async handle(event: CryptoPriceReachedEvent) {
    console.log(
      `Olá ${event.eventData.user.userName}! A criptomoeda ${event.eventData.cryptoId} atingiu o preço alvo desejado!`,
    )
  }
}
