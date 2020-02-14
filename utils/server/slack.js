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

const channels = process.env.SLACK_CHANNELS.split(':')

async function updatePurpose(user) {
  const id = user != null ? await getSlackId(user.emails) : null
  return userAPI.conversations.setPurpose({
    channel: channels[0],
    purpose: id != null ? `<@${id}> is on duty today` : '',
  })
}

export const notifyCurrentResponsible = user =>
  Promise.all([
    user != null
      ? sendMessage(
          user.emails,
          `
Hi ${
            user.firstName
          }, you're on frontend duty today. Please monitor following channels:

${channels.map(channel => `<#${channel}>`).join(`
`)}
`,
        )
      : Promise.resolve(),
    updatePurpose(user),
  ])
