import { createSchema, createYoga } from 'graphql-yoga'

import { typeDefs } from './schema/typeDefs.generated'
import { resolvers } from './schema/resolvers.generated'

import type { APIContext } from './schema/context_type'

import { PostgresConnector } from './connectors/postgres_connector'

const connector = new PostgresConnector({})
await connector.connect()
console.info(await connector.init_database())

const yoga = createYoga<APIContext>({
	schema: createSchema({
		typeDefs,
		resolvers
	}),
	landingPage: false,
	context: { db: connector }
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
