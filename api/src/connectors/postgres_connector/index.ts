import type {
	Connector,
	ConnectorResponse,
	ConnectorSelectOptions,
	DataType,
	WithID,
	ConnectorDeleteOptions,
	ConnectorUpdateOptions
} from "../connector";

import {
	ConnectorConditionConjunction,
	ConnectorConditionOperator,
	type ConnectorCondition
} from "../connector_condition";

import { sql, SQL } from "bun";

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

	async init_database(): Promise<ConnectorResponse> {
		if (!this.is_connected()) await this.connect()
		if (!this.is_connected()) throw new Error("Expected established connection to database")

		// Get initial table count
		const table_count = parseInt((await this.db`SELECT count(*)
			FROM information_schema.tables
			WHERE table_schema = 'public';`)[0].count)

		// Run table initialization script
		await this.db.begin(async (sql) => {
			await sql.file("src/connectors/postgres_connector/create_tables.sql")
		})

		// Get current table count
		const table_count_new = parseInt((await this.db`SELECT count(*)
			FROM information_schema.tables
			WHERE table_schema = 'public';`)[0].count)

		// Calculate number of new tables
		const tables_created_count = table_count_new - table_count

		return {
			message: `Initialized database with ${tables_created_count} new table(s) created`,
			success: true,
		}
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

	is_connected<ConnectedState = { db: SQL }>(): this is ConnectedState {
		return this.db !== undefined
	}

	assert_is_connected<ConnectedState = { db: SQL }>(): asserts this is ConnectedState {
		if (!this.is_connected()) throw new Error("Expected established connection to database")
	}

	async close(_force?: boolean): Promise<ConnectorResponse> {
		if (!this.is_connected()) return { success: true }

		try {
			await this.db.close()
			return { success: true }
		} catch (e) {
			throw new Error("Closing connection to database failed", { cause: e })
		}
	}

	async insert<ObjectInputType extends DataType, ObjectType extends DataType>(
		into: string,
		input: ObjectInputType
	): Promise<WithID<ObjectType>> {
		this.assert_is_connected()

		const results = (await this.db`INSERT INTO ${sql(into)} ${sql(input)} RETURNING *`) as WithID<ObjectType>[]

		if (results[0] === undefined) throw new Error("Failed to insert object into database")

		return Promise.resolve(results[0])
	}

	async select<ObjectType extends DataType>(
		from: string,
		options?: ConnectorSelectOptions
	): Promise<WithID<ObjectType>[]> {
		this.assert_is_connected()

		const conditional_string = (
			conditional: ConnectorCondition | undefined,
			start = "WHERE"
		) => conditional === undefined ?
				"" :
				PostgresConnector.conditional_to_string(conditional, start)

		const joins = (() => {
			if (options?.sub_select === undefined || options.sub_select.length === 0) return this.db``

			const query = options.sub_select.reduce((accumulator, current) => {
				const join = `JOIN ${current.from} ${conditional_string(current.options?.conditional, "ON")}`
				return accumulator + join
			}, "")

			return this.db.unsafe(query)
		})()

		const join_from = (() => {
			if (options?.sub_select === undefined) return this.db``

			const value = options.sub_select.reduce((accumulator, current) => {
				return accumulator + `, row_to_json(${current.from})${current.as === undefined ? '' : ` AS ${current.as}`}`
			}, "")

			return this.db.unsafe(value)
		})()

		return (
			await this.db`SELECT ${this.db(from)}.*${join_from} FROM ${this.db(from)} ${joins} ${this.db.unsafe(conditional_string(options?.conditional))}`
		) as WithID<ObjectType>[]
	}

	async update<ObjectInputType extends DataType, ObjectType extends DataType>(
		from: string,
		input: ObjectInputType,
		options?: ConnectorUpdateOptions
	): Promise<WithID<ObjectType>[]> {
		this.assert_is_connected()

		const conditional = options?.conditional === undefined ?
			sql`` :
			sql.unsafe(PostgresConnector.conditional_to_string(options.conditional))

		return (
			await this.db`UPDATE ${this.db(from)} SET ${this.db(input)} ${conditional} RETURNING *`
		) as WithID<ObjectType>[]
	}

	async delete<ObjectType extends DataType>(
		from: string,
		options?: ConnectorDeleteOptions
	): Promise<WithID<ObjectType>[]> {
		this.assert_is_connected()

		const conditional = options?.conditional === undefined ?
			sql`` :
			sql.unsafe(PostgresConnector.conditional_to_string(options.conditional))

		return (
			await this.db`DELETE FROM ${this.db(from)} ${conditional} RETURNING *`
		) as WithID<ObjectType>[]
	}

	connection_string(): string {
		return `postgres://${this.user}:${this.pass}@${this.host}:${this.port}/${this.database}`
	}

	static conditional_to_string(conditional?: ConnectorCondition, start: string = "WHERE"): string {
		if (conditional === undefined) return ""

		const operator_to_string = (operator: ConnectorConditionOperator): string => {
			switch (operator) {
				case ConnectorConditionOperator.EQUAL:
					return "="
				case ConnectorConditionOperator.LESS_THAN:
					return "<"
				case ConnectorConditionOperator.GREATER_THAN:
					return ">"
				case ConnectorConditionOperator.LESS_THAN_OR_EQUAL:
					return "<="
				case ConnectorConditionOperator.GREATER_THAN_OR_EQUAL:
					return ">="
				case ConnectorConditionOperator.NOT_EQUAL:
					return "!="
				default:
					return "=";
			}
		}

		const conjunction_to_string = (conjunction: ConnectorConditionConjunction): string => {
			switch (conjunction) {
				case ConnectorConditionConjunction.AND:
					return "AND"
				case ConnectorConditionConjunction.OR:
					return "OR"
				default:
					return "AND"
			}
		}

		let result = `${start} `
		while (true) {
			result += `${conditional.lhs} ${operator_to_string(conditional.operator)} ${conditional.rhs}`

			if (conditional.next === undefined) break

			result += ` ${conjunction_to_string(conditional.next.conjunction)} `
			conditional = conditional.next.condition
		}

		return result
	}
}
