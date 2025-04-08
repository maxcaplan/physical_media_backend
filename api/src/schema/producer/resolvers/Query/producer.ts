import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Producer, QueryResolvers } from './../../../types.generated';

export const producer: NonNullable<QueryResolvers['producer']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<Producer>(
        "producers",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    return Promise.resolve(results[0] || null)
};
