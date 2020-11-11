import {DBUser} from './graphql'
import {notifyCurrentResponsible} from '../../utils/server/slack'
import {getEmails} from '../../utils/server/fetchEmails'
import {getCurrentResponsible} from '../../utils/server/getCurrentDuty'
import {initSpaceBotAPI} from '../../utils/server/space'

async function getAndNotifyCurrentResponsible() {
  const [responsible, fetch] = await Promise.all([
    getCurrentResponsible(),
    initSpaceBotAPI(),
  ])
  let user = null
  if (responsible != null) {
    const {data} = await fetch(
      `team-directory/profiles/${responsible.id}?$fields=name,emails`,
    )
    user = {
      emails: getEmails(data),
      firstName: data.name.firstName,
    }
  }
  return notifyCurrentResponsible(user)
}

export default async (_, response) => {
  await getAndNotifyCurrentResponsible()
  response.status(200).end()
}
