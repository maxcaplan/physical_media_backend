import type { Artist, QueryResolvers } from './../../../types.generated';
import { ConnectorConditionConjunction, ConnectorConditionOperator } from '../../../../connectors/connector';

export const artist: NonNullable<QueryResolvers['artist']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<Artist>(
        'artists',
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: arg.id,
            }
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
