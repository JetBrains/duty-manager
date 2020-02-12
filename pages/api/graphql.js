import {buildSchema} from 'graphql'
import graphqlHTTP from 'express-graphql'
import axios from 'axios'

import typeDefs from '../../main-schema/schema.graphql'

import {
  fetchTeam,
  fetchRegularDuties,
  fetchDuties,
  addTeamMember,
  removeTeamMember,
  setRegularDuty,
  setDuty,
} from '../../fauna'

import '../../utils/server/slack'
import {notifyAssignedResponsible} from '../../utils/server/slack'
import {getDateString} from '../../utils/date'

const Absence = ({available, description, since, till}) => ({
  available,
  reason: description,
  since: since.iso,
  till: till.iso,
})

const HolidayAbsence = ({date, name, workingDay}) => ({
  available: workingDay,
  reason: name,
  since: date.iso,
  till: date.iso,
})

async function getHolidays(locationId, {fetch, today}) {
  const endDate = new Date(today)
  endDate.setMonth(today.getMonth() + 2)
  const {data} = await fetch(
    `public-holidays/holidays?location=${locationId}&startDate=${getDateString(
      today,
    )}&endDate=${getDateString(endDate)}&$fields=data(date,name,workingDay)`,
  )
  return data.data
}

const User = ({id, name, smallAvatar, username, absences, locations}) => ({
  id,
  username,
  name: () => `${name.firstName} ${name.lastName}`,
  profile:
    smallAvatar &&
    (() => {
      const avatarUrl = `${process.env.SPACE_URL}/d/${smallAvatar}`
      return {
        avatar: {
          url: `api/avatar?url=${avatarUrl}`,
        },
      }
    }),
  async absences(_, context) {
    const holidays = await getHolidays(locations[0].location.id, context)
    return [...absences.map(Absence), ...holidays.map(HolidayAbsence)]
  },
})

const userFields =
  'id,name,smallAvatar,username,absences(available,description,since,till),locations(location(id))'

async function DBUser({id, balance}, {fetch, log}) {
  const {data} = await fetch(
    `team-directory/profiles/${id}?$fields=${userFields}`,
  )
  return {
    ...User(data),
    balance,
  }
}

const Team = (users, context) => ({
  id: 'team',
  users: () => users.map(user => DBUser(user, context)),
})

const RegularDuty = ({weekday, responsible, backup}) => ({
  weekday,
  responsible: responsible && ((_, context) => DBUser(responsible, context)),
  backup: backup && ((_, context) => DBUser(backup, context)),
})

const RegularDuties = data => ({
  id: `regularDuties`,
  items: data.map(RegularDuty),
})

const Duty = ({date, responsible, backup}) => ({
  date,
  responsible: responsible && ((_, context) => DBUser(responsible, context)),
  backup: backup && ((_, context) => DBUser(backup, context)),
})

const Duties = data => ({
  id: `duties`,
  items: data.map(Duty),
})

async function notifyResponsibleIfNeeded(
  {responsibleId, backupId, assignerId, date},
  context,
) {
  const responsibleOrBackupId = responsibleId ?? backupId
  if (responsibleOrBackupId == null || assignerId === responsibleOrBackupId) {
    return
  }

  const [responsibleEmail, assignerEmail] = await Promise.all(
    [responsibleOrBackupId, assignerId].map(async id => {
      const user = await DBUser({id}, context)
      return user.email()
    }),
  )

  notifyAssignedResponsible({
    responsibleEmail,
    assignerEmail,
    isBackup: responsibleId == null,
    date,
    url: context.url,
  })
}

const graphqlMiddleware = ({fetch, url}) =>
  graphqlHTTP({
    schema: buildSchema(typeDefs),
    graphiql: true,
    rootValue: {
      async me(_, {fetch}) {
        const {data} = await fetch(
          `team-directory/profiles/me?$fields=${userFields}`,
        )
        return User(data)
      },
      async search({query}, {fetch}) {
        const {data} = await fetch(
          `team-directory/profiles?query=${encodeURIComponent(
            query,
          )}&reportPastMembers=false&meOnTop=true&$fields=data(${userFields})`,
        )
        return data.data.map(User)
      },
      async team(_, context) {
        const data = await fetchTeam()
        return Team(data, context)
      },
      async regularDuties() {
        const data = await fetchRegularDuties()
        return RegularDuties(data)
      },
      async duties() {
        const data = await fetchDuties()
        return Duties(data)
      },
      async addTeamMember(variables, context) {
        const data = await addTeamMember(variables)
        return Team(data, context)
      },
      async removeTeamMember(variables, context) {
        const data = await removeTeamMember(variables)
        return Team(data, context)
      },
      async setRegularDuty({input}) {
        const data = await setRegularDuty(input)
        return RegularDuties(data)
      },
      async setDuty({input}, context) {
        const {duties, team} = await setDuty(input)
        notifyResponsibleIfNeeded(input, context)

        return {duties: () => Duties(duties), team: () => Team(team, context)}
      },
    },
    context: {fetch, url, today: new Date()},
  })

export function createSpaceFetcher(token) {
  const spaceClient = axios.create({
    baseURL: `${process.env.SPACE_URL}/api/http/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  spaceClient.interceptors.response.use(
    response => response,
    error => {
      console.log(error)
      throw error
    },
  )
  const cache = {}
  return url => {
    if (!(url in cache)) {
      cache[url] = spaceClient.get(url)
    }
    return cache[url]
  }
}

export default (request, response) => {
  const {space_token} = request.cookies
  const fetch = createSpaceFetcher(space_token)
  return graphqlMiddleware({fetch, url: request.headers.origin})(
    request,
    response,
  )
}
