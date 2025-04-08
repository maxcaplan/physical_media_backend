import { ConnectorConditionOperator } from '../../../../connectors/connector';
import type { Artist, MutationResolvers } from './../../../types.generated';

export const delete_artist: NonNullable<MutationResolvers['delete_artist']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<Artist>(
        "artists",
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: arg.id
            }
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
