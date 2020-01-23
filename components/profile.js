import React, {Suspense} from 'react'
import {Profile as RingProfile} from '@jetbrains/ring-ui/components/header/header'
import {graphql, preloadQuery, usePreloadedQuery} from 'react-relay/hooks'

import RelayEnvironment from '../utils/relay-environment'

const GuestUser = {guest: true}

const ProfileQuery = graphql`
  query profileQuery {
    me {
      name
      profile {
        avatar {
          url
        }
      }
    }
  }
`

const preloadedQuery = preloadQuery(RelayEnvironment, ProfileQuery)

function Profile() {
  return <RingProfile user={GuestUser} onLogin={authenticate} />
}

export default function ProfileContainer(props) {
  return (
    <Suspense fallback={<RingProfile loading />}>
      <Profile {...props} />
    </Suspense>
  )
}
