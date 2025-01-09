"use server"

import { EmailTemplate } from "@/components/emails/test-template"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

interface props {
  name: string
  quest: string
  gamedatetime: string
  phonenumber: string
}

export async function sendEmail({
  name,
  quest,
  gamedatetime,
  phonenumber,
}: props) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Vkveste <onboarding@resend.dev>",
      to: ["test@mail.ru"],
      subject: "Уведомление о брони",
      react: EmailTemplate({
        name: name,
        quest: quest,
        gamedatetime: gamedatetime,
        phonenumber: phonenumber,
      }),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
