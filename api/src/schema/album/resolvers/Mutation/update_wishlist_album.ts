import { ConnectorConditionOperator } from '../../../../connectors/connector';
import type {
    Album,
    MutationResolvers,
    UpdateAlbumInput,
    UpdateWishlistAlbumInput,
    WishlistAlbum
} from './../../../types.generated';

export const update_wishlist_album: NonNullable<MutationResolvers['update_wishlist_album']> = async (
    _parent,
    arg,
    ctx
) => {
    /** Update wishlist album */
    const { album_input, ...rest } = arg.input
    const wishlist_album_results = await ctx.db.update<Omit<UpdateWishlistAlbumInput, "album_input">, WishlistAlbum & { album_id: number }>(
        "wishlist_albums",
        { ...rest },
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: arg.input.id
            }
        }
    )

    if (wishlist_album_results[0] === undefined) return Promise.resolve(null)

    /** Update album fields if updates suplied */
    const album_results = arg.input.album_input === undefined || arg.input.album_input === null ?
        null :
        await ctx.db.update<UpdateAlbumInput, Album>(
            "albums",
            arg.input.album_input,
            {
                conditional: {
                    lhs: "id",
                    operator: ConnectorConditionOperator.EQUAL,
                    rhs: wishlist_album_results[0].album_id
                }
            }
        )

    /** Get updated album if an update was done */
    const album = album_results === null || album_results[0] === undefined ?
        null :
        album_results[0]

    /** Return update results */
    if (wishlist_album_results[0] === undefined) return Promise.resolve(null)
    wishlist_album_results[0].album = album
    return wishlist_album_results[0]
};
