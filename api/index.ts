import { createSchema, createYoga } from 'graphql-yoga'

import { type_defs as typeDefs } from './schema/typedefs'

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
