import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { QueryResolvers, WishlistAlbum } from './../../../types.generated';

export const wishlist_albums: NonNullable<QueryResolvers['wishlist_albums']> = async (
    _parent,
    _arg,
    ctx
) => {
    const results = await ctx.db.select<WishlistAlbum>(
        "wishlist_albums",
    )
    return Promise.resolve(results)
};
