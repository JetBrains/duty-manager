import path from 'path'

import {buildSchema} from "graphql";
import graphqlHTTP from 'express-graphql'
import {importSchema} from 'graphql-import'

export default graphqlHTTP({
  schema:
    path.resolve(process.cwd(), 'schema.graphql')
    |> importSchema
    |> buildSchema,
  graphiql: true,
  rootValue: {
    async me() {
      return {name: 'Foo'}
    },
  },
})
