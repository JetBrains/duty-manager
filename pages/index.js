import Head from 'next/head'
import {RelayEnvironmentProvider} from 'react-relay/hooks'

import RelayEnvironment from '../utils/relay-environment'
import '../utils/set-cookie'
import '../utils/jsdom'
import Header, {Tray} from '@jetbrains/ring-ui/components/header/header'

import Profile from '../components/profile'
import Settings from '../components/settings'

import './index.css'

function App() {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Head>
        <title>Duty Manager</title>
      </Head>
      <Header>
        <h1>Duty Manager</h1>
        <Tray>
          <Settings />
          <Profile />
        </Tray>
      </Header>
    </RelayEnvironmentProvider>
  )
}

export default App
