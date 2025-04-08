import type { Connector } from "../connectors/connector";

export interface APIContext {
	db: Connector
}
