import { createSchema, createYoga } from 'graphql-yoga'

import { typeDefs } from './schema/typeDefs.generated'
import { resolvers } from './schema/resolvers.generated'

import { PostgresConnector } from './connectors/postgres_connector'

const connector = new PostgresConnector({})
await connector.connect()

const yoga = createYoga({
	schema: createSchema({
		typeDefs,
		resolvers
	}),
	landingPage: false
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
