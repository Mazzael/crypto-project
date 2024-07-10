import { EventHandlerInterface } from '../../../../../core/event/event-handler-interface'
import { env } from '../../../../../infra/env/env'
import { transporter } from '../../../../../infra/mail-sender/nodemailer'
import { CryptoPriceReachedEvent } from '../crypto-price-reached-event'

export class CryptoPriceReachedHandler
  implements EventHandlerInterface<CryptoPriceReachedEvent>
{
  async handle(event: CryptoPriceReachedEvent) {
    try {
      await transporter.sendMail({
        from: {
          name: 'Crypto Notificator',
          address: env.GMAIL_USER,
        },
        to: event.eventData.user.email,
        subject: 'Crypto price reached email',
        text: `
          Hello ${event.eventData.user.userName}! The alert you setted for when ${event.eventData.cryptoId} reached
          ${event.eventData.targetPrice} was triggered, and it's available for ${event.eventData.price}
        `,
      })
    } catch (err) {
      console.error(err)
    }
  }
}
