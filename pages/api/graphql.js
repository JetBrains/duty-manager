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

const User = ({id, name, smallAvatar, username}) => ({
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
})

const userFields = 'id,name,smallAvatar,username'

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

const RegularDuty = ({weekday, responsible}) => ({
  weekday,
  responsible: (_, context) => DBUser(responsible, context),
})

const Duty = ({date, responsible}) => ({
  date,
  responsible: (_, context) => DBUser(responsible, context),
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
        return data.map(RegularDuty)
      },
      async duties() {
        const data = await fetchDuties()
        return data.map(Duty)
      },
      async addTeamMember(variables, context) {
        const data = await addTeamMember(variables)
        return Team(data, context)
      },
      async removeTeamMember(variables, context) {
        const data = await removeTeamMember(variables)
        return Team(data, context)
      },
      async setRegularDuty(variables) {
        const data = await setRegularDuty(variables)
        return RegularDuty(data)
      },
      async setDuty(variables) {
        const data = await setDuty(variables)
        return Duty(data)
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
