import { ConnectorConditionOperator } from '../../../../connectors/connector';
import type { OwnedAlbum, QueryResolvers } from './../../../types.generated';
export const owned_album: NonNullable<QueryResolvers['owned_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<OwnedAlbum>(
        "owned_albums",
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
