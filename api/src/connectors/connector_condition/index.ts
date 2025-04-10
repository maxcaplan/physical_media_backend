export interface ConnectorCondition {
	lhs: string
	rhs: string | number
	operator: ConnectorConditionOperator
	next?: {
		condition: ConnectorCondition,
		conjunction: ConnectorConditionConjunction
	}
	add(
		conjunction: ConnectorConditionConjunction,
		condition: ConnectorCondition
	): ConnectorCondition
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

export type OperatorString = "=" | "<" | ">" | "<=" | ">=" | "!="
export type ConjunctionString = "and" | "or"

export class ConnectorCondition implements ConnectorCondition {
	lhs: string
	rhs: string | number
	operator: ConnectorConditionOperator
	next?: {
		condition: ConnectorCondition;
		conjunction: ConnectorConditionConjunction
	}

	constructor(
		lhs: string,
		operator: ConnectorConditionOperator | OperatorString,
		rhs: string | number
	) {
		this.lhs = lhs
		this.operator = ConnectorCondition.string_to_operator(operator)
		this.rhs = rhs
	}

	/** Add the next condition */
	add(
		conjunction: ConnectorConditionConjunction | ConjunctionString,
		condition: ConnectorCondition
	): ConnectorCondition {
		this.next = {
			condition,
			conjunction: ConnectorCondition.string_to_conjunction(conjunction)
		}

		return this
	}

	private static string_to_operator(
		operator: ConnectorConditionOperator | OperatorString
	): ConnectorConditionOperator {
		if (typeof operator === "number") return operator

		switch (operator) {
			case "=":
				return ConnectorConditionOperator.EQUAL
			case "<":
				return ConnectorConditionOperator.LESS_THAN
			case ">":
				return ConnectorConditionOperator.GREATER_THAN
			case "<=":
				return ConnectorConditionOperator.LESS_THAN_OR_EQUAL
			case ">=":
				return ConnectorConditionOperator.GREATER_THAN_OR_EQUAL
			case "!=":
				return ConnectorConditionOperator.NOT_EQUAL
			default:
				return ConnectorConditionOperator.EQUAL
		}
	}

	private static string_to_conjunction(
		conjunction: ConnectorConditionConjunction | ConjunctionString
	): ConnectorConditionConjunction {
		if (typeof conjunction === "number") return conjunction

		switch (conjunction) {
			case "and":
				return ConnectorConditionConjunction.AND
			case "or":
				return ConnectorConditionConjunction.OR
			default:
				return ConnectorConditionConjunction.AND;
		}
	}
}





