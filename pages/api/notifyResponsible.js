import querystring from 'querystring'
import axios from 'axios'
import dotenv from 'dotenv'

import {fetchDuties, fetchRegularDuties} from '../../fauna'
import {getDateString, getWeekday} from '../../utils/date'

import {createSpaceFetcher, DBUser} from './graphql'
import {notifyCurrentResponsible} from "../../utils/server/slack";
import {getEmails} from "../../utils/server/fetchEmails";

dotenv.config()

async function getCurrentResponsible() {
  const regularDutiesPromise = fetchRegularDuties()
  const duties = await fetchDuties()
  const today = new Date()
  // today.setDate(13)
  const currentDate = getDateString(today)
  const currentWeekday = getWeekday(today)
  const duty =
    duties.find(({date}) => date === currentDate) ??
    (await regularDutiesPromise).find(({weekday}) => weekday === currentWeekday)
  return duty?.responsible
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
  const [responsible, fetch] = await Promise.all([
    getCurrentResponsible(),
    initSpaceAPI(),
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
