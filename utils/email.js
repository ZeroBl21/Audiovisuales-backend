import * as dotenv from 'dotenv'
dotenv.config()

import Sib from 'sib-api-v3-sdk'

export function sendEmail(targetUser, targetMail, reservationId) {
  const date = new Date()
  const today = date.toISOString().split('T')[0]

  const client = Sib.ApiClient.instance
  const apiKey = client.authentications['api-key']
  apiKey.apiKey = process.env.MAIL_APIKEY

  const transEmailApi = new Sib.TransactionalEmailsApi()

  const sender = {
    email: process.env.MAIL_SENDER,
  }

  const receivers = [
    {
      email: targetMail,
    },
  ]

  return transEmailApi.sendTransacEmail({
    sender,
    to: receivers,
    templateId: 2,
    params: {
      name: targetUser,
      id: reservationId,
      date: today,
      use: date.toISOString(),
    },
  })
}
