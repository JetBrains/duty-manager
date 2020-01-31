import {useReducer} from 'react'
import Dropdown from '@jetbrains/ring-ui/components/dropdown/dropdown'
import {TrayIcon} from '@jetbrains/ring-ui/components/header/header'
import Settings20pxIcon from '@jetbrains/icons/settings-20px.svg'

import Team from './team'

export default function Settings() {
  const [_, redraw] = useReducer(i => i + 1, 0)

  return (
    <Dropdown
      anchor={({active}) => (
        <TrayIcon title="Edit team" active={active} icon={Settings20pxIcon} />
      )}
    >
      <Team />
    </Dropdown>
  )
}
