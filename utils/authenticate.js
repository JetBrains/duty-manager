const scope = 'ViewAbsences'
// const authUrl = `${process.env.SPACE_URL}/oauth/auth?response_type=token&redirect_uri=${location.origin}/authorized&client_id=${process.env.SPACE_CLIENT_ID}&scope=${scope}`
const authUrl = '/authorized'

export default function authenticate() {
  const authWindow = window.open(authUrl, 'blank')
  return new Promise((resolve, reject) => {
    const messageListener = e => {
      window.removeEventListener('message', messageListener)
      console.log(e)
    }
    window.addEventListener('message', messageListener)

    const closeListener = e => {
      authWindow.removeEventListener('close', closeListener)
      reject()
    }
    authWindow.addEventListener('close', closeListener)
  })
}
