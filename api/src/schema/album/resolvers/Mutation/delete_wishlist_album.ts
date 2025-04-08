import { ConnectorConditionOperator } from '../../../../connectors/connector';
import type { Album, MutationResolvers, WishlistAlbum } from './../../../types.generated';

export const delete_wishlist_album: NonNullable<MutationResolvers['delete_wishlist_album']> = async (
    _parent,
    arg,
    ctx
) => {
    /** Delete wishlist album object */
    const wishlist_album_results = await ctx.db.delete<WishlistAlbum & { album_id: number }>(
        "wishlist_albums",
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: arg.id
            }
        }
    )

    if (wishlist_album_results[0] === undefined) return Promise.resolve(null)

    /** Delete album object associated with wishlist album object */
    const album_results = await ctx.db.delete<Album>(
        "albums",
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: wishlist_album_results[0].album_id
            }
        }
    )

    if (album_results[0] === undefined) return Promise.resolve(wishlist_album_results[0])
    wishlist_album_results[0].album = album_results[0]
    return Promise.resolve(wishlist_album_results[0])
};
