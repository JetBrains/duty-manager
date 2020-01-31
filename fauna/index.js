import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

async function fetchQuery(selector, query, variables) {
  const {data} = await axios.post(
    'https://graphql.fauna.com/graphql',
    {query, variables},
    {
      headers: {
        Authorization: `Bearer ${process.env.FAUNA_SECRET}`,
      },
    },
  )
  if (data.errors != null) {
    throw new Error(data.errors[0].message)
  }
  return selector(data.data)
}

// needed for code completion etc
const gql = ([query]) => query

export const fetchTeam = () =>
  fetchQuery(
    data => data.team.data,
    gql`
      query {
        team {
          data {
            id
            balance
          }
        }
      }
    `,
  )

export const fetchRegularDuties = () =>
  fetchQuery(
    data => data.regularDuties.data,
    gql`
      query {
        regularDuties {
          data {
            weekday
            responsible {
              id
              balance
            }
          }
        }
      }
    `,
  )

export const fetchDuties = () =>
  fetchQuery(
    data => data.duties.data,
    gql`
      query {
        duties {
          data {
            date
            responsible {
              id
              balance
            }
          }
        }
      }
    `,
  )

export async function addTeamMember({userId}) {
  await fetchQuery(
    data => data.createUser,
    gql`
      mutation($data: UserInput!) {
        createUser(data: $data) {
          id
          balance
        }
      }
    `,
    {data: {id: userId, balance: 0}},
  )
  return fetchTeam()
}

export async function removeTeamMember({userId}) {
  const user = await fetchQuery(
    data => data.user,
    gql`
      query($userId: ID!) {
        user(id: $userId) {
          _id
        }
      }
    `,
    {userId},
  )
  await fetchQuery(
    data => data.deleteUser,
    gql`
      mutation($id: ID!) {
        deleteUser(id: $id) {
          id
          balance
        }
      }
    `,
    {id: user._id},
  )
  return fetchTeam()
}

const createRegularDuty = data =>
  fetchQuery(
    data => data.createRegularDuty,
    gql`
      mutation($data: RegularDutyInput!) {
        createRegularDuty(data: $data) {
          weekday
          responsible {
            id
            balance
          }
        }
      }
    `,
    {data},
  )

const updateRegularDuty = (id, data) =>
  fetchQuery(
    data => data.updateRegularDuty,
    gql`
      mutation($id: ID!, $data: RegularDutyInput!) {
        updateRegularDuty(id: $id, data: $data) {
          weekday
          responsible {
            id
            balance
          }
        }
      }
    `,
    {id, data},
  )

export async function setRegularDuty({weekday, userId}) {
  const {regularDuty, user} = await fetchQuery(
    data => data,
    gql`
      query($weekday: Weekday!, $userId: ID!) {
        regularDuty(weekday: $weekday) {
          _id
        }
        user(id: $userId) {
          _id
        }
      }
    `,
    {weekday, userId},
  )

  const data = {weekday, responsible: {connect: user._id}}

  return regularDuty != null
    ? updateRegularDuty(regularDuty._id, data)
    : createRegularDuty(data)
}

const createDuty = data =>
  fetchQuery(
    data => data.createDuty,
    gql`
      mutation($data: DutyInput!) {
        createDuty(data: $data) {
          date
          responsible {
            id
            balance
          }
        }
      }
    `,
    {data},
  )

const updateDuty = (id, data) =>
  fetchQuery(
    data => data.updateDuty,
    gql`
      mutation($id: ID!, $data: DutyInput!) {
        updateDuty(id: $id, data: $data) {
          date
          responsible {
            id
            balance
          }
        }
      }
    `,
    {id, data},
  )

export async function setDuty({date, userId}) {
  const {duty, user} = await fetchQuery(
    data => data,
    gql`
      query($date: Date!, $userId: ID!) {
        duty(date: $date) {
          _id
        }
        user(id: $userId) {
          _id
        }
      }
    `,
    {date, userId},
  )

  const data = {date, responsible: {connect: user._id}}

  return duty != null ? updateDuty(duty._id, data) : createDuty(data)
}
