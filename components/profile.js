import React, {useState} from 'react'
import {Profile as RingProfile} from '@jetbrains/ring-ui/components/header/header'
import LoginDialog from '@jetbrains/ring-ui/components/login-dialog/login-dialog'

const GuestUser = {guest: true}

const scope = 'ViewAbsences'
const authUrl = `${process.env.SPACE_URL}/oauth/auth?response_type=token&redirect_uri=${location.origin}/authorized&client_id=${process.env.SPACE_CLIENT_ID}&scope=${scope}`

const login = () =>
  new Promise(resolve => {
    const token = process.env.SPACE_TOKEN
    document.cookie = `space_token=${token}`
    resolve()
    // const authWindow = window.open(authUrl)
  })

export default function Profile() {
  const [showLoginDialog, setShowLoginDialog] = useState(false)

  return (
    <>
      <RingProfile user={GuestUser} onLogin={login} />
      <LoginDialog
        show={showLoginDialog}
        onCancel={() => setShowLoginDialog(false)}
        url={authUrl}
      />
    </>
  )
}
