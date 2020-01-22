import Head from 'next/head'

import '../utils/jsdom'
import Header, {Tray} from '@jetbrains/ring-ui/components/header/header'

import Profile from '../components/profile'
import './index.css'

function App() {
  return (
    <>
      <Head>
        <title>Duty Manager</title>
      </Head>
      <Header>
        <h1>Duty Manager</h1>
        <Tray>
          <Profile />
        </Tray>
      </Header>
    </>
  )
}

export default App
