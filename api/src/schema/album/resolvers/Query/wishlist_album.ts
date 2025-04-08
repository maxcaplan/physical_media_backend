import { ConnectorConditionOperator } from '../../../../connectors/connector';
import type { QueryResolvers, WishlistAlbum } from './../../../types.generated';

export const wishlist_album: NonNullable<QueryResolvers['wishlist_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<WishlistAlbum>(
        "wishlist_albums",
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
