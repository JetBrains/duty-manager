import axios from 'axios'
import querystring from 'querystring'
import dotenv from 'dotenv'

dotenv.config()

export function createSpaceFetcher(token) {
  const spaceClient = axios.create({
    baseURL: `${process.env.SPACE_URL}/api/http/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  spaceClient.interceptors.response.use(
    response => response,
    error => {
      console.log(error)
      throw error
    },
  )
  const cache = {}
  return url => {
    if (!(url in cache)) {
      cache[url] = spaceClient.get(url)
    }
    return cache[url]
  }
}

const BOT_SCOPE = 'Profile:ViewProfile'
export async function initSpaceBotAPI() {
  const {data} = await axios.post(
    `${process.env.SPACE_URL}/oauth/token`,
    querystring.stringify({
      grant_type: 'client_credentials',
      scope: BOT_SCOPE,
    }),
    {
      auth: {
        username: process.env.SPACE_BOT_ID,
        password: process.env.SPACE_BOT_SECRET,
      },
    },
  )

  return createSpaceFetcher(data.access_token)
}
