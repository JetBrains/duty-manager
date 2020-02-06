import {graphql, useFragment, useRelayEnvironment} from 'react-relay/hooks'
import {commitMutation} from 'react-relay'
import {H2} from '@jetbrains/ring-ui/components/heading/heading'

import UserSelect, {useMyId} from './user-select'
import {regularDutyFragment} from './regular-duty'

const mutation = graphql`
  mutation dutySetResponsibleMutation($input: SetDutyInput!) {
    setDuty(input: $input) {
      duties {
        items {
          ...dutyFragment
        }
      }
      team {
        users {
          balance
        }
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
  updateBalance,
  prevResponsibleId,
}) => store => {
  const duties = store.get(listId)
  const items = duties.getLinkedRecords('items')
  const prevDuty = items.find(item => item.getValue(dateField) === dateValue)
  const userRecord = store.get(userId)
  if (updateBalance) {
    const balance = userRecord.getValue('balance')
    userRecord.setValue(balance + 1, 'balance')
    if (prevResponsibleId != null) {
      const prevResponsible = store.get(prevResponsibleId)
      const prevResponsibleBalance = prevResponsible.getValue('balance')
      prevResponsible.setValue(prevResponsibleBalance - 1, 'balance')
    }
  }

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
  const myId = useMyId()
  console.log({myId})
  const dateString = getDateString(date)
  const environment = useRelayEnvironment()
  const regularDutyData = useFragment(regularDutyFragment, regularDuty)
  const dutyData = useFragment(
    graphql`
      fragment dutyFragment on Duty {
        date
        responsible {
          id
          ...userSelectUserFragment
          ...userSelectUserIdFragment
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
        dateString={dateString}
        selected={responsible}
        label="Responsible"
        onSelect={({user}) =>
          commitMutation(environment, {
            mutation,
            variables: {
              input: {
                date: dateString,
                responsibleId: user.id,
                prevResponsibleId: responsible?.id,
                assignerId: myId,
              },
            },
            optimisticUpdater: createOptimisticUpdater({
              listId,
              dateField: 'date',
              dateValue: dateString,
              userField: 'responsible',
              userId: user.id,
              idPrefix: 'duty',
              updateBalance: true,
              prevResponsibleId: responsible?.id,
            }),
          })
        }
      />
      <UserSelect
        dateString={dateString}
        selected={backup}
        label="Backup"
        excluded={responsible}
        onSelect={({user}) =>
          commitMutation(environment, {
            mutation,
            variables: {
              input: {date: dateString, backupId: user?.id, assignerId: myId},
            },
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
