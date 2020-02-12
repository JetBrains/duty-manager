import {WebClient} from '@slack/web-api'
import dotenv from 'dotenv'

dotenv.config()

const botAPI = new WebClient(process.env.SLACK_TOKEN)
const userAPI = new WebClient(process.env.SLACK_USER_TOKEN)

async function getSlackId(email) {
  const {user} = await botAPI.users.lookupByEmail({email})
  return user.id
}

async function sendMessage(email, text) {
  const channel = await getSlackId(email)
  await botAPI.chat.postMessage({channel, text})
}

export async function notifyAssignedResponsible({
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

export async function notifyCurrentResponsibles(emails) {
  const ids = await Promise.all(emails.map(getSlackId))
  return userAPI.conversations.setTopic({
    channel: process.env.SLACK_CHANNEL,
    topic: `For https://buildserver.labs.intellij.net issues${
      ids.length > 0
        ? `. ${ids.map(id => `<@${id}>`).join(' and ')} ${
            ids.length > 1 ? 'are' : 'is'
          } on duty today`
        : ''
    }`,
  })
}
