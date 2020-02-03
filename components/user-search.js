import {useState, useTransition} from 'react'
import {graphql, preloadQuery, usePreloadedQuery} from 'react-relay/hooks'
import Select from '@jetbrains/ring-ui/components/select/select'
import {Anchor} from '@jetbrains/ring-ui/components/dropdown/dropdown'
import AddIcon from '@jetbrains/icons/add.svg'

import RelayEnvironment from '../utils/relay-environment'

import styles from './user-search.css'
import SUSPENSE_CONFIG from '../utils/suspense-config'
import {createItem} from "./user-select";

const Query = graphql`
  query userSearchQuery($query: String!) {
    search(query: $query) {
      id
      name
      profile {
        avatar {
          url
        }
      }
    }
  }
`

const initialPreloadedQuery = preloadQuery(RelayEnvironment, Query, {query: ''})

export default function UserSearch({users, onSelect, onDeselect}) {
  const [preloadedQuery, setPreloadedQuery] = useState(initialPreloadedQuery)
  const [startTransition, isLoading] = useTransition(SUSPENSE_CONFIG)
  const {search} = usePreloadedQuery(Query, preloadedQuery)

  return (
    <Select
      type={Select.Type.CUSTOM}
      customAnchor={({wrapperProps, buttonProps, popup}) => (
        <div {...wrapperProps} className={styles.select}>
          <Anchor {...buttonProps} icon={AddIcon}>
            Add members
          </Anchor>
          {popup}
        </div>
      )}
      label="Add members"
      loading={isLoading}
      multiple
      data={search.map(createItem)}
      selected={users.map(createItem)}
      filter
      onSelect={onSelect}
      onDeselect={onDeselect}
      onFilter={query => {
        const newPreloadedQuery = preloadQuery(RelayEnvironment, Query, {query})
        startTransition(() => {
          setPreloadedQuery(newPreloadedQuery)
        })
      }}
    />
  )
}
