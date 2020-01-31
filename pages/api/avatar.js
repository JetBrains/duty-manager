import axios from 'axios'

export default async (request, response) => {
  const {space_token} = request.cookies
  if (space_token == null) {
    response.status(401).send('Unauthorized')
  }
  const {url} = request.query
  const spaceResponse = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${space_token}`,
    },
    responseType: 'stream',
  })
  spaceResponse.data.pipe(response)
}
