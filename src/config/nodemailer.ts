import { logError, logMsg } from '@Utils'
import { createTransport } from 'nodemailer'

const Admintransporter = createTransport({
  host: process.env.HOSTMAILER,
  port: Number(process.env.PORTMAILER),
  secure: true,
  auth: {
    user: process.env.USERMAILER,
    pass: process.env.PASSMAILER,
  },
})

export const sendAdminMail = async (mailOptions: any) => {
  try {
    await Admintransporter.sendMail(mailOptions)
    logMsg('Mensaje enviado')
  } catch (error) {
    logError('Problemas al enviar el mail')
  }
}

export const mailOptionsToUser = (fromMail: string, fromName: string) => ({
  from: 'Jose Herrera',
  to: fromMail,
  subject: 'Jose Herrera',
  html: `
    <h3>Estimado/a ${fromName}</h3>
    <p>Muchas gracias por registrarse.</p>
    <br>
    <p>Saludos Cordiales.</p>
    <p><strong>José Herrera.</strong></p>
    `,
})
