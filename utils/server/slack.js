import {WebClient} from '@slack/web-api'
import dotenv from 'dotenv'

dotenv.config()

const botAPI = new WebClient(process.env.SLACK_TOKEN)

export async function getSlackId(emails) {
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

async function updateUserGroup(user) {
  const id = await getSlackId(user.emails)
  return botAPI.usergroups.users.update({
    usergroup: process.env.SLACK_USERGROUP,
    users: id,
  })
}

export const notifyCurrentResponsible = user =>
  user != null
    ? Promise.all([
        sendMessage(
          user.emails,
          `
Hi ${
            user.firstName
          }, you're on frontend duty today. Please monitor following channels:

${channels.map(channel => `<#${channel}>`).join(`
`)}
`,
        ),
        updateUserGroup(user),
      ])
    : Promise.resolve()
