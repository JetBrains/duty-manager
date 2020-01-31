import {Suspense} from 'react'
import {Profile as RingProfile} from '@jetbrains/ring-ui/components/header/header'
import {graphql, preloadQuery, usePreloadedQuery} from 'react-relay/hooks'

import RelayEnvironment from '../utils/relay-environment'
import authenticate from '../utils/authenticate'

const ProfileQuery = graphql`
  query profileQuery {
    me {
      name
      username
      profile {
        avatar {
          url
        }
      }
    }
  }
`

const preloadedQuery = preloadQuery(RelayEnvironment, ProfileQuery)
module.hot?.decline()

function Profile() {
  const {me} = usePreloadedQuery(ProfileQuery, preloadedQuery)

  return (
    <RingProfile
      user={me}
      profileUrl={`${process.env.SPACE_URL}/m/${me.username}`}
      showLogOut
      onLogin={authenticate}
      onLogout={() => authenticate(true)}
    />
  )
}

export default function ProfileContainer(props) {
  return (
    <Suspense fallback={<RingProfile loading />}>
      <Profile {...props} />
    </Suspense>
  )
}
