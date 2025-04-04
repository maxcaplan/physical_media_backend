import type { Connector, ConnectorResponse } from "./connector";
import { SQL } from "bun";

interface PostgresConnectorProps {
	host?: string,
	port?: number | string,
	database?: string,
	user?: string,
	pass?: string,
}

export class PostgresConnector implements Connector {
	host: string
	port: number | string
	database: string
	user: string
	pass: string

	db?: SQL

	constructor(props?: PostgresConnectorProps) {
		const host = props?.host || process.env.PG_HOST
		const port = props?.port || process.env.PG_PORT
		const database = props?.database || process.env.PG_DATABASE
		const user = props?.user || process.env.PG_USER
		const pass = props?.pass || process.env.PG_PASS

		if (host === undefined) throw new Error("Expected connection host to not be undefined")
		if (port === undefined) throw new Error("Expected connection port to not be undefined")
		if (database === undefined) throw new Error("Expected connection database to not be undefined")
		if (user === undefined) throw new Error("Expected connection user to not be undefined")
		if (pass === undefined) throw new Error("Expected connection pass to not be undefined")

		this.host = host
		this.port = port
		this.database = database
		this.user = user
		this.pass = pass
	}

	async connect(): Promise<ConnectorResponse> {
		try {
			this.db = new SQL(this.connection_string())

			await this.db.connect()
			return { success: true }
		} catch (e) {
			throw new Error("Connection to database failed", { cause: e })
		}
	}

	async close(force?: boolean): Promise<ConnectorResponse> {
		if (this.db === undefined) return { success: true }

		try {
			await this.db.close()
			return { success: true }
		} catch (e) {
			throw new Error("Closing connection to database failed", { cause: e })
		}
	}

	connection_string(): string {
		return `postgres://${this.user}:${this.pass}@${this.host}:${this.port}/${this.database}`
	}
}
