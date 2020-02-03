import {graphql, useFragment, useRelayEnvironment} from 'react-relay/hooks'
import {commitMutation} from 'react-relay'
import {H2} from '@jetbrains/ring-ui/components/heading/heading'

import UserSelect from './user-select'
import {regularDutyFragment} from './regular-duty'

const mutation = graphql`
  mutation dutySetResponsibleMutation($input: SetDutyInput!) {
    setDuty(input: $input) {
      items {
        ...dutyFragment
      }
    }
  }
`

export const createOptimisticUpdater = ({
  listId,
  dateField,
  dateValue,
  userField,
  userId,
  idPrefix,
}) => store => {
  const duties = store.get(listId)
  const items = duties.getLinkedRecords('items')
  const prevDuty = items.find(item => item.getValue(dateField) === dateValue)
  const userRecord = store.get(userId)
  if (prevDuty != null) {
    prevDuty.setLinkedRecord(userRecord, userField)
  } else {
    const newDuty = store.create(
      `${idPrefix}:${dateValue.toLowerCase()}`,
      'RegularDuty',
    )
    newDuty.setValue(dateValue, dateField)
    newDuty.setLinkedRecord(userRecord, userField)
    duties.setLinkedRecords(items.concat(newDuty), 'items')
  }
}

export const getDateString = date => date.toISOString().slice(0, 10)

export default function Duty({date, duty, regularDuty, listId}) {
  const dateString = getDateString(date)
  const environment = useRelayEnvironment()
  const regularDutyData = useFragment(regularDutyFragment, regularDuty)
  const dutyData = useFragment(
    graphql`
      fragment dutyFragment on Duty {
        date
        responsible {
          ...userSelectUserFragment
          ...userSelectExcludedFragment
        }
        backup {
          ...userSelectUserFragment
        }
      }
    `,
    duty,
  )

  const responsible = dutyData?.responsible ?? regularDutyData?.responsible
  const backup = dutyData?.backup ?? regularDutyData?.backup

  return (
    <div>
      <H2>{date.getDate()}</H2>
      <UserSelect
        selected={responsible}
        label="Responsible"
        onSelect={({user}) =>
          commitMutation(environment, {
            mutation,
            variables: {input: {date: dateString, responsibleId: user.id}},
            optimisticUpdater: createOptimisticUpdater({
              listId,
              dateField: 'date',
              dateValue: dateString,
              userField: 'responsible',
              userId: user.id,
              idPrefix: 'duty',
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
            variables: {input: {date: dateString, backupId: user?.id}},
            optimisticUpdater: createOptimisticUpdater({
              listId,
              dateField: 'date',
              dateValue: dateString,
              userField: 'backup',
              userId: user.id,
              idPrefix: 'duty',
            }),
          })
        }
      />
    </div>
  )
}
