import {useContext} from 'react'
import {graphql, useFragment} from 'react-relay/hooks'
import Select from '@jetbrains/ring-ui/components/select/select'

import TeamContext from '../utils/team-context'

import {createItem} from './user-search'
import styles from './user-select.css'

export default function UserSelect({selected, excluded, onSelect, label}) {
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
          }
        }
      `,
      team,
    ) ?? {}

  return (
    <div>
      <Select
        size={Select.Size.FULL}
        className={styles.select}
        label={label}
        data={users?.map(user =>
          createItem(
            excludedData != null
              ? {...user, excluded: user.id === excludedData.id}
              : user,
          ),
        )}
        selected={selectedData && createItem(selectedData)}
        onSelect={onSelect}
      />
    </div>
  )
}
