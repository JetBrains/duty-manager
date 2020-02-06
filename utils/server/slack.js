import {WebClient} from '@slack/web-api'
import dotenv from 'dotenv'

dotenv.config()

console.log('INITIALIZING SLACK')
const web = new WebClient(process.env.SLACK_TOKEN)

async function getSlackId(email) {
  const {user} = await web.users.lookupByEmail({email})
  return user.id
}

async function sendMessage(email, text) {
  const channel = await getSlackId(email)
  await web.chat.postMessage({channel, text})
}

export async function notifyResponsible({
  responsibleEmail,
  assignerEmail,
  isBackup,
  date,
  url,
}) {
  const assignerId = await getSlackId(assignerEmail)
  return sendMessage(
    responsibleEmail,
    `
<@${assignerId}> assigned you for ${
      isBackup ? 'backup ' : ''
    }duty on ${new Date(date).toDateString()}.
If you can't do it on that day, please find a replacement and reassign the duty: ${url}
  `,
  )
}
