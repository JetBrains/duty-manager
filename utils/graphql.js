import axios from 'axios'

import authenticate from './authenticate'

export default async function fetchGraphQL(query, variables, isRetry = false) {
  try {
    return await axios.post('/api/graphql', {query, variables})
  } catch (e) {
    console.error(e)
    const response = {}
    if (response.status === 401 && !isRetry) {
      await authenticate()
      return fetchGraphQL(query, true)
    }
    throw new Error(
      `Network error: ${response.status} ${await response.text()}`,
    )
  }
}
