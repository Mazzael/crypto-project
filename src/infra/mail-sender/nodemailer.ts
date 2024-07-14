import { createTransport } from 'nodemailer'
import { env } from '../env/env'

const transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_PASS,
  },
})

export async function sendAlertMail(
  email: string,
  userName: string,
  cryptoId: string,
  targetPrice: number,
  currentPrice: number,
) {
  try {
    await transporter.sendMail({
      from: {
        name: 'Crypto Notificator',
        address: env.GMAIL_USER,
      },
      to: email,
      subject: 'Crypto price reached email',
      text: `
        Hello ${userName}! The alert you setted for when ${cryptoId} reached
        ${targetPrice} was triggered, and it's available for ${currentPrice}
      `,
    })
  } catch (err) {
    console.error(err)
  }
}

// const mailOptions = {
//   from: {
//     name: 'Crypto Notificator',
//     address: env.GMAIL_USER,
//   },
//   to: 'bar@example.com',
//   subject: 'Test',
//   text: 'Hello World',
//   html: '<b>Hello World?</b>',
// }

// export async function sendMail() {
//   try {
//     await transporter.sendMail(mailOptions)
//   } catch (err) {
//     console.error(err)
//   }
// }
