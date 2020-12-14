import {DBUser} from './graphql'
import {getSlackId} from '../../utils/server/slack'
import {fetchEmails} from '../../utils/server/fetchEmails'
import {getCurrentDuty} from '../../utils/server/getCurrentDuty'
import {initSpaceBotAPI} from '../../utils/server/space'

async function getCurrentResponsibles() {
  const [duty, fetch] = await Promise.all([getCurrentDuty(), initSpaceBotAPI()])
  return Promise.all(
    [duty.responsible, duty.backup].filter(Boolean).map(async user => {
      const emails = await fetchEmails(user.id, fetch)
      return getSlackId(emails)
    }),
  )
}

export default async (_, response) =>
  response.status(200).json(await getCurrentResponsibles())
