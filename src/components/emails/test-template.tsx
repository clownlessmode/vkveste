import * as React from "react"

interface EmailTemplateProps {
  name: string
  quest: string
  gamedatetime: string
  phonenumber: string
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  quest,
  gamedatetime,
  phonenumber,
}) => (
  <div>
    <h1>Новая бронь</h1>
    <div>
      {name} <br />
      {quest} <br />
      {gamedatetime} <br />
      {phonenumber}
    </div>
  </div>
)
