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

const channels = process.env.SLACK_CHANNELS.split(':')

async function updateTopic(user) {
  const id = user != null ? await getSlackId(user.email) : null
  return userAPI.conversations.setTopic({
    channel: channels[0],
    topic: id != null ? `<@${id}> is on duty today` : '',
  })
}

export const notifyCurrentResponsible = user =>
  Promise.all([
    user != null
      ? sendMessage(
          user.email,
          `
Hi ${
            user.firstName
          }, you're on frontend duty today. Please monitor following channels:

${channels.map(channel => `<#${channel}>`).join(`
`)}
`,
        )
      : Promise.resolve(),
    updateTopic(user),
  ])
