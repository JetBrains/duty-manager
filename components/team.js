import {Suspense, useEffect, useState, useTransition} from 'react'
import Avatar, {Size} from '@jetbrains/ring-ui/components/avatar/avatar'
import Button from '@jetbrains/ring-ui/components/button/button'
import Loader from '@jetbrains/ring-ui/components/loader-inline/loader-inline'
import Theme, {ThemeContext} from '@jetbrains/ring-ui/components/global/theme'
import {H3} from '@jetbrains/ring-ui/components/heading/heading'
import RemoveIcon from '@jetbrains/icons/close.svg'
import {commitMutation} from 'react-relay'
import {graphql, preloadQuery, usePreloadedQuery} from 'react-relay/hooks'

import RelayEnvironment from '../utils/relay-environment'

import styles from './team.css'
import UserSearch from './user-search'
import Popup from '@jetbrains/ring-ui/components/popup/popup'

const TeamQuery = graphql`
  query teamQuery {
    team {
      id
      users {
        id
        name
        profile {
          avatar {
            url
          }
        }
      }
    }
  }
`

const AddMemberMutation = graphql`
  mutation teamAddMemberMutation($id: ID!) {
    addTeamMember(userId: $id) {
      users {
        id
        name
        profile {
          avatar {
            url
          }
        }
      }
    }
  }
`

const RemoveMemberMutation = graphql`
  mutation teamRemoveMemberMutation($id: ID!) {
    removeTeamMember(userId: $id) {
      users {
        id
      }
    }
  }
`

const commitAddMemberMutation = (user, team) =>
  commitMutation(RelayEnvironment, {
    mutation: AddMemberMutation,
    variables: {id: user.id},
    optimisticResponse: {
      addTeamMember: {
        id: team.id,
        users: team.users.concat(user),
      },
    },
  })

const commitRemoveMemberMutation = (userId, team) =>
  commitMutation(RelayEnvironment, {
    mutation: RemoveMemberMutation,
    variables: {id: userId},
    optimisticResponse: {
      removeTeamMember: {
        id: team.id,
        users: team.users
          .filter(user => user.id !== userId)
          .map(({id}) => ({id})),
      },
    },
  })

let lastPreloadedQuery
export const preload = () => {
  lastPreloadedQuery = preloadQuery(RelayEnvironment, TeamQuery)
}
preload()
module.hot?.decline()

const TeamPopup = props => (
  <Popup className={styles.popup} top={-12} {...props} />
)

function Team(props) {
  const {team} = usePreloadedQuery(TeamQuery, lastPreloadedQuery)

  return (
    <TeamPopup {...props}>
      <H3 className={styles.heading}>Team</H3>
      <ul className={styles.list}>
        {team.users.map(({id, name, profile}) => (
          <li key={id} className={styles.item}>
            <Avatar
              className={styles.avatar}
              size={Size.Size20}
              url={profile?.avatar?.url}
            />
            {name}
            <Button
              onClick={() => commitRemoveMemberMutation(id, team)}
              title="Remove"
              icon={RemoveIcon}
            />
          </li>
        ))}
      </ul>
      <UserSearch
        users={team.users}A
        onSelect={({user}) => {
          console.log('SELECT:', user.name, team.users)
          commitAddMemberMutation(user, team)
        }}
        onDeselect={({user}) => commitRemoveMemberMutation(user.id, team)}
      />
    </TeamPopup>
  )
}

export default function TeamContainer(props) {
  return (
    <ThemeContext.Provider value={Theme.LIGHT}>
      <Suspense
        fallback={
          <TeamPopup {...props}>
            <Loader>Loading...</Loader>
          </TeamPopup>
        }
      >
        <Team {...props} />
      </Suspense>
    </ThemeContext.Provider>
  )
}
