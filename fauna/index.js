import axios from 'axios'
import dotenv from 'dotenv'

dotenv.config()

async function fetchQuery(selector, query, variables) {
  // console.log({query, variables})
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
  // console.log(data.data?.regularDuties?.data)
  return selector(data.data)
}

// needed for code completion etc
const gql = ([query]) => query

export const fetchTeam = () =>
  fetchQuery(
    data => data.dutyTeam.users.data,
    gql`
      query {
        dutyTeam {
          users {
            data {
              id
              balance
            }
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
            backup {
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
        duties(_size: 1000) {
          data {
            date
            responsible {
              id
              balance
            }
            backup {
              id
              balance
            }
          }
        }
      }
    `,
  )

const getTeamId = () =>
  fetchQuery(
    data => data.dutyTeam._id,
    gql`
      query {
        dutyTeam {
          _id
        }
      }
    `,
  )

const createOrUpdateTeam = async (id, data) =>
  id != null
    ? fetchQuery(
        data => data.updateTeam.users.data,
        gql`
          mutation($id: ID!, $data: TeamInput!) {
            updateTeam(id: $id, data: $data) {
              users {
                data {
                  id
                  balance
                }
              }
            }
          }
        `,
        {id, data},
      )
    : fetchQuery(
        data => data.createTeam.users.data,
        gql`
          mutation($data: TeamInput!) {
            createTeam(data: $data) {
              users {
                data {
                  id
                  balance
                }
              }
            }
          }
        `,
        {data},
      )

const getUser = async id =>
  id != null
    ? fetchQuery(
        data => data.user,
        gql`
          query($id: ID!) {
            user(id: $id) {
              _id
              id
              balance
            }
          }
        `,
        {id},
      )
    : null

export async function addTeamMember({userId}) {
  const [teamId, user] = await Promise.all([getTeamId(), getUser(userId)])

  return createOrUpdateTeam(teamId, {
    users:
      user != null
        ? {connect: [user._id]}
        : {create: [{id: userId, balance: 0}]},
  })
}

export async function removeTeamMember({userId}) {
  const [teamId, user] = await Promise.all([getTeamId(), getUser(userId)])
  return user != null
    ? createOrUpdateTeam(teamId, {
        users: {disconnect: [user._id]},
      })
    : fetchTeam()
}

const createOrUpdateRegularDuty = (id, data) =>
  fetchQuery(
    data => data,
    id != null
      ? gql`
          mutation($id: ID!, $data: RegularDutyInput!) {
            updateRegularDuty(id: $id, data: $data) {
              _id
            }
          }
        `
      : gql`
          mutation($data: RegularDutyInput!) {
            createRegularDuty(data: $data) {
              _id
            }
          }
        `,
    {id, data},
  )

const createConnect = ({_id}) => ({connect: _id})

export async function setRegularDuty({weekday, responsibleId, backupId}) {
  const [regularDuty, responsible, backup] = await Promise.all([
    fetchQuery(
      data => data.regularDuty,
      gql`
        query($weekday: Weekday!) {
          regularDuty(weekday: $weekday) {
            _id
          }
        }
      `,
      {weekday},
    ),
    getUser(responsibleId),
    getUser(backupId),
  ])

  const data = {
    weekday,
    ...(responsible != null ? {responsible: createConnect(responsible)} : {}),
    ...(backup != null ? {backup: createConnect(backup)} : {}),
  }

  await createOrUpdateRegularDuty(regularDuty?._id, data)
  return fetchRegularDuties()
}

const createOrUpdateDuty = (id, data, responsible, prevResponsible) =>
  fetchQuery(
    data => data,
    gql`
      mutation(
        $update: Boolean!
        $id: ID!
        $data: DutyInput!
        $hasResponsible: Boolean!
        $responsibleId: ID!
        $responsible: UserInput!
        $hasPrevResponsible: Boolean!
        $prevResponsibleId: ID!
        $prevResponsible: UserInput!
      ) {
        updateDuty(id: $id, data: $data) @include(if: $update) {
          date
          responsible {
            id
            balance
          }
        }
        createDuty(data: $data) @skip(if: $update) {
          date
          responsible {
            id
            balance
          }
        }
        updateUser(id: $responsibleId, data: $responsible)
          @include(if: $hasResponsible) {
          balance
        }
        updatePrevResponsible: updateUser(
          id: $prevResponsibleId
          data: $prevResponsible
        ) @include(if: $hasPrevResponsible) {
          balance
        }
      }
    `,
    {
      update: id != null,
      id: id ?? 'unused',
      data,
      hasResponsible: responsible != null,
      responsible:
        responsible != null
          ? {id: responsible.id, balance: responsible.balance + 1}
          : {id: 'unused', balance: 0},
      responsibleId: responsible?._id ?? 'unused',
      hasPrevResponsible: prevResponsible != null,
      prevResponsible:
        prevResponsible != null
          ? {id: prevResponsible.id, balance: prevResponsible.balance - 1}
          : {id: 'unused', balance: 0},
      prevResponsibleId: prevResponsible?._id ?? 'unused',
    },
  )

export async function setDuty({
  date,
  responsibleId,
  backupId,
  prevResponsibleId,
}) {
  const [duty, responsible, backup, prevResponsible] = await Promise.all([
    fetchQuery(
      data => data.duty,
      gql`
        query($date: Date!) {
          duty(date: $date) {
            _id
          }
        }
      `,
      {date},
    ),
    getUser(responsibleId),
    getUser(backupId),
    getUser(prevResponsibleId),
  ])

  const data = {
    date,
    ...(responsible != null ? {responsible: createConnect(responsible)} : {}),
    ...(backup != null ? {backup: createConnect(backup)} : {}),
  }

  await createOrUpdateDuty(duty?._id, data, responsible, prevResponsible)
  return fetchQuery(
    ({duties, dutyTeam}) => ({duties: duties.data, team: dutyTeam.users.data}),
    gql`
      query {
        duties(_size: 1000) {
          data {
            date
            responsible {
              id
              balance
            }
            backup {
              id
              balance
            }
          }
        }
        dutyTeam {
          users {
            data {
              id
              balance
            }
          }
        }
      }
    `,
  )
}
