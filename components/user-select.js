import {useContext} from 'react'
import classNames from 'classnames'
import {graphql, useFragment} from 'react-relay/hooks'
import Select from '@jetbrains/ring-ui/components/select/select'

import TeamContext from '../utils/team-context'

import styles from './user-select.css'

const absenceMatchesDate = (dateString, {since, till}) =>
  since <= dateString && dateString <= till

const getAbsence = (dateString, absences) => {
  if (dateString == null || absences == null) {
    return null
  }
  const matching = absences.filter(absence =>
    absenceMatchesDate(dateString, absence),
  )
  return matching.find(absence => !absence.available) ?? matching[0]
}

export function createItem(user) {
  const {id, name, profile, excluded, description, balance = 0} = user
  return {
    key: id,
    label: name,
    avatar: profile?.avatar?.url,
    disabled: excluded,
    description,
    user,
    rightNodes: balance !== 0 && (
      <span
        className={classNames(
          styles.balance,
          balance > 0 ? styles.positive : styles.negative,
        )}
      >
        {balance > 0 && '+'}
        {balance}
      </span>
    ),
  }
}

export default function UserSelect({
  selected,
  excluded,
  onSelect,
  label,
  dateString,
}) {
  const team = useContext(TeamContext)

  const selectedData = useFragment(
    graphql`
      fragment userSelectUserFragment on User {
        id
        name
        profile {
          avatar {
            url
          }
        }
        absences {
          available
          reason
          since
          till
        }
        balance
      }
    `,
    selected,
  )
  const excludedData = useFragment(
    graphql`
      fragment userSelectExcludedFragment on User {
        id
      }
    `,
    excluded,
  )
  const {users} =
    useFragment(
      graphql`
        fragment userSelectTeamFragment on Team {
          users {
            id
            name
            profile {
              avatar {
                url
              }
            }
            absences {
              available
              reason
              since
              till
            }
            balance
          }
        }
      `,
      team,
    ) ?? {}

  const createUserItem = user => {
    if (user == null) {
      return null
    }

    const {available, reason} = getAbsence(dateString, user.absences) ?? {}
    return createItem({
      ...user,
      excluded: user.id === excludedData?.id || available === false,
      description: reason,
    })
  }

  const selectedItem = createUserItem(selectedData)

  return (
    <div>
      <Select
        size={Select.Size.FULL}
        className={classNames(styles.select, {
          [styles.error]: selectedItem?.disabled,
        })}
        label={label}
        data={users?.map(createUserItem)}
        selected={createUserItem(selectedData)}
        onSelect={onSelect}
      />
    </div>
  )
}
