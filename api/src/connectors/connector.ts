export interface ConnectorResponse {
	success: boolean
	errors?: unknown | unknown[]
}

/** Database connector abstraction */
export interface Connector {
	/** Establish a database connection */
	connect(): Promise<ConnectorResponse>

	/** Close database connection */
	close(force?: boolean): Promise<ConnectorResponse>
}
