import { createSchema, createYoga } from 'graphql-yoga'

import { type_defs as typeDefs } from './schema/typedefs'
import { PostgresConnector } from './connectors/postgres_connector'

const connector = new PostgresConnector({})
await connector.connect()

const yoga = createYoga({
	schema: createSchema({
		typeDefs
	})
})

const server = Bun.serve({
	fetch: yoga
})

console.info(
	`Server is running on ${new URL(
		yoga.graphqlEndpoint,
		`http://${server.hostname}:${server.port}`
	)}`
)
