const SCOPE = 'Profile:ViewAbsences'

export default function authenticate(force = false) {
  if (force) {
    document.cookie =
      'space_token=deleted; expires=Thu, 01 Jan 1970 00:00:00 GMT'
  }

  const authUrl = `${process.env.SPACE_URL}/oauth/auth?request_credentials=${
    force ? 'required' : 'default'
  }&response_type=token&redirect_uri=${location.origin}&client_id=${
    process.env.SPACE_CLIENT_ID
  }&scope=${SCOPE}`
  location.replace(authUrl)
}
