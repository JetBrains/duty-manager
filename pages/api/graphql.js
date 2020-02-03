import path from 'path'

import {buildSchema} from 'graphql'
import graphqlHTTP from 'express-graphql'
import {importSchema} from 'graphql-import'
import axios from 'axios'

import {
  fetchTeam,
  fetchRegularDuties,
  fetchDuties,
  addTeamMember,
  removeTeamMember,
  setRegularDuty,
  setDuty,
} from '../../fauna'

const Absence = ({available, description, since, till}) => ({
  available,
  reason: description,
  since: since.iso,
  till: till.iso,
})

const User = ({id, name, smallAvatar, username, absences}) => ({
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

async function DBUser({id, balance}, {fetch}) {
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

const graphqlMiddleware = fetch =>
  graphqlHTTP({
    schema:
      path.join(process.cwd(), 'main-schema/schema.graphql')
      |> importSchema
      |> buildSchema,
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
        return {duties: () => Duties(duties), team: () => Team(team, context)}
      },
    },
    context: {fetch},
  })

export default (request, response) => {
  const {space_token} = request.cookies
  const spaceClient = axios.create({
    baseURL: `${process.env.SPACE_URL}/api/http/`,
    headers: {
      Authorization: `Bearer ${space_token}`,
    },
  })
  const cache = {}
  const fetch = url => {
    if (!(url in cache)) {
      cache[url] = spaceClient.get(url)
    }
    return cache[url]
  }
  return graphqlMiddleware(fetch)(request, response)
}
