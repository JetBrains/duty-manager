import Head from 'next/head'
import {RelayEnvironmentProvider} from 'react-relay/hooks'
import RelayEnvironment from '../utils/relay-environment'

import '../utils/jsdom'
import Header, {Tray} from '@jetbrains/ring-ui/components/header/header'

import Profile from '../components/profile'
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
          <Profile />
        </Tray>
      </Header>
    </RelayEnvironmentProvider>
  )
}

export default App
