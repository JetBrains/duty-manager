import {Environment, Network, RecordSource, Store} from 'relay-runtime'
import fetchGraphQL from './graphql'

const fetchRelay = (params, variables) => fetchGraphQL(params.text, variables)

export default new Environment({
  network: Network.create(fetchRelay),
  store: new Store(new RecordSource()),
})
