import { createTransport } from 'nodemailer'
import { env } from '../env/env'

export const transporter = createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: env.GMAIL_USER,
    pass: env.GMAIL_PASS,
  },
})

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
