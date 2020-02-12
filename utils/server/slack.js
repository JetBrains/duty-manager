import {WebClient} from '@slack/web-api'
import dotenv from 'dotenv'

dotenv.config()

const botAPI = new WebClient(process.env.SLACK_TOKEN)
const userAPI = new WebClient(process.env.SLACK_USER_TOKEN)

async function getSlackId(emails) {
  let user
  for (const email of emails) {
    try {
      const data = await botAPI.users.lookupByEmail({email})
      user = data.user
      break
    } catch (e) {}
  }
  return user.id
}

async function sendMessage(emails, text) {
  const channel = await getSlackId(emails)
  await botAPI.chat.postMessage({channel, text})
}

export async function notifyAssignedResponsible({
  responsibleEmails,
  assignerEmails,
  isBackup,
  date,
  url,
}) {
  const assignerId = await getSlackId(assignerEmails)
  return sendMessage(
    responsibleEmails,
    `
<@${assignerId}> assigned you for ${
      isBackup ? 'backup ' : ''
    }duty on ${new Date(date).toDateString()}.
If you can't do it on that day, please find a replacement and reassign the duty: ${url}
  `,
  )
}

export async function notifyCurrentResponsibles(emailArrays) {
  const ids = await Promise.all(emailArrays.map(getSlackId))
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
