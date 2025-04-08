export type DataType = Object

export type WithID<T extends DataType> = T & {
	id: string
}

export interface ConnectorResponse {
	success: boolean
	message?: string
	errors?: unknown | unknown[]
}

export interface ConnectorSelectOptions {
	fields?: string | string[]
	conditional?: ConnectorCondition
}

export interface ConnectorDeleteOptions {
	conditional?: ConnectorCondition
}

export interface ConnectorUpdateOptions {
	conditional?: ConnectorCondition
}

export interface ConnectorCondition {
	lhs: string | number
	rhs: string | number
	operator: ConnectorConditionOperator
	next?: {
		condition: ConnectorCondition,
		conjunction: ConnectorConditionConjunction
	}
}

export enum ConnectorConditionOperator {
	EQUAL,
	LESS_THAN,
	GREATER_THAN,
	LESS_THAN_OR_EQUAL,
	GREATER_THAN_OR_EQUAL,
	NOT_EQUAL,
}

export enum ConnectorConditionConjunction {
	AND,
	OR,
}

/** Database connector abstraction */
export interface Connector {
	/** Initialize the database */
	init_database(): Promise<ConnectorResponse>

	/** Establish a database connection */
	connect(): Promise<ConnectorResponse>

	/** Whether a connection to the database is established */
	is_connected<ConnectedState>(): this is ConnectedState

	/** Close database connection */
	close(force?: boolean): Promise<ConnectorResponse>

	/** Insert an object into the database */
	insert<ObjectInputType extends DataType, ObjectType extends DataType>(
		into: string,
		input: ObjectInputType
	): Promise<WithID<ObjectType>>

	/** Select objects in the database */
	select<ObjectType extends DataType>(
		from: string,
		options?: ConnectorSelectOptions
	): Promise<WithID<ObjectType>[]>

	/** Update objects in the database */
	update<ObjectInputType extends DataType, ObjectType extends DataType>(
		from: string,
		input: ObjectInputType,
		options?: ConnectorUpdateOptions
	): Promise<WithID<ObjectType>[]>

	/** Delete objects from the database */
	delete<ObjectType extends DataType>(
		from: string,
		options?: ConnectorDeleteOptions
	): Promise<WithID<ObjectType>[]>
}

