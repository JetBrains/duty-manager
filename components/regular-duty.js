import {graphql, useFragment, useRelayEnvironment} from 'react-relay/hooks'
import {commitMutation} from 'react-relay'
import {H2} from '@jetbrains/ring-ui/components/heading/heading'

import UserSelect from './user-select'
import {createOptimisticUpdater} from './duty'

export const regularDutyFragment = graphql`
  fragment regularDutyFragment on RegularDuty {
    weekday
    responsible {
      id
      ...userSelectUserFragment
      ...userSelectExcludedFragment
    }
    backup {
      ...userSelectUserFragment
    }
  }
`

const mutation = graphql`
  mutation regularDutySetResponsibleMutation($input: SetRegularDutyInput!) {
    setRegularDuty(input: $input) {
      items {
        ...regularDutyFragment
      }
    }
  }
`

export default function RegularDuty({weekday, regularDuty, listId}) {
  const environment = useRelayEnvironment()
  const {responsible, backup} =
    useFragment(regularDutyFragment, regularDuty) ?? {}

  return (
    <div>
      <H2>{weekday}</H2>
      <UserSelect
        selected={responsible}
        label="Responsible"
        onSelect={({user}) =>
          commitMutation(environment, {
            mutation,
            variables: {input: {weekday, responsibleId: user.id}},
            optimisticUpdater: createOptimisticUpdater({
              listId,
              dateField: 'weekday',
              dateValue: weekday,
              userField: 'responsible',
              userId: user.id,
              idPrefix: 'regular-duty',
            }),
          })
        }
      />
      <UserSelect
        selected={backup}
        label="Backup"
        excluded={responsible}
        onSelect={({user}) =>
          commitMutation(environment, {
            mutation,
            variables: {input: {weekday, backupId: user?.id}},
            optimisticUpdater: createOptimisticUpdater({
              listId,
              dateField: 'weekday',
              dateValue: weekday,
              userField: 'backup',
              userId: user.id,
              idPrefix: 'regular-duty',
            }),
          })
        }
      />
    </div>
  )
}
