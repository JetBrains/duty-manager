import path from 'path'

import {buildSchema} from 'graphql'
import graphqlHTTP from 'express-graphql'
import {importSchema} from 'graphql-import'

const graphqlMiddleware = graphqlHTTP({
  schema:
    path.join(process.cwd(), 'schema.graphql') |> importSchema |> buildSchema,
  graphiql: true,
  rootValue: {
    async me() {
      return {name: 'Foo'}
    },
  },
})

export default (request, response) => {
  const {space_token} = request.cookies
  if (space_token == null) {
    response.status(401).send('Unauthorized')
  } else {
    return graphqlMiddleware(request, response)
  }
}
