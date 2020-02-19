import querystring from 'querystring'
import axios from 'axios'
import dotenv from 'dotenv'

import {fetchDuties, fetchRegularDuties} from '../../fauna'
import {getDateString, getWeekday} from '../../utils/date'

import {createSpaceFetcher, DBUser} from './graphql'
import {notifyCurrentResponsibles} from '../../utils/server/slack'
import {getEmails} from '../../utils/server/getEmails'

dotenv.config()

async function getCurrentResponsibles() {
  const regularDutiesPromise = fetchRegularDuties()
  const duties = await fetchDuties()
  const today = new Date()
  // today.setDate(9)
  const currentDate = getDateString(today)
  const currentWeekday = getWeekday(today)
  const duty =
    duties.find(({date}) => date === currentDate) ??
    (await regularDutiesPromise).find(({weekday}) => weekday === currentWeekday)
  return duty != null ? [duty.responsible, duty.backup].filter(Boolean) : []
}

async function initSpaceAPI() {
  const {data} = await axios.post(
    `${process.env.SPACE_URL}/oauth/token`,
    querystring.stringify({
      grant_type: 'client_credentials',
    }),
    {
      auth: {
        username: process.env.SPACE_BOT_ID,
        password: process.env.SPACE_BOT_SECRET,
      },
    },
  )

  return createSpaceFetcher(data.access_token)
}

async function getAndNotifyCurrentResponsible() {
  const [responsibles, fetch] = await Promise.all([
    getCurrentResponsibles(),
    initSpaceAPI(),
  ])

  const emailArrays = await Promise.all(
    responsibles.map(async responsible => getEmails(responsible.id, fetch)),
  )
  return notifyCurrentResponsibles(emailArrays)
}

export default async (_, response) => {
  await getAndNotifyCurrentResponsible()
  response.status(200).end()
}
