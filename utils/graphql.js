import axios from 'axios'

import authenticate from './authenticate'

const never = new Promise(() => {})

export default async function fetchGraphQL(query, variables) {
  if (window.isJSDOM) {
    return never
  }

  const {data} = await axios.post('api/graphql', {query, variables})
  if (data.errors != null) {
    if (
      data.errors.some(error =>
        /Request failed with status code 40[13]/.test(error.message),
      )
    ) {
      authenticate()
    }
    throw new Error(data.errors[0].message)
  }
  return data
}
