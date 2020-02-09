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

const Absence = ({available, description, since, till}) => ({
  available,
  reason: description,
  since: since.iso,
  till: till.iso,
})

const User = ({id, name, smallAvatar, username, absences, emails}) => ({
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
  absences: () => absences.map(Absence),
})

const userFields =
  'id,name,smallAvatar,username,absences(available,description,since,till)'

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
    context: {fetch, url},
  })

export function createSpaceFetcher(token) {
  const spaceClient = axios.create({
    baseURL: `${process.env.SPACE_URL}/api/http/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
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
