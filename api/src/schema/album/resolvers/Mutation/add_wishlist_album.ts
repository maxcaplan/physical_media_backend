import type { AddAlbumInput, AddWishlistAlbumInput, Album, MutationResolvers, WishlistAlbum } from './../../../types.generated';

type AddWishlistAlbumFields = Omit<AddWishlistAlbumInput, "album_input"> & { album_id: number }

export const add_wishlist_album: NonNullable<MutationResolvers['add_wishlist_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const album_results = await ctx.db.insert<AddAlbumInput, Album>("albums", arg.input.album_input)
    const { album_input, ...rest } = arg.input
    const wishlist_album_input: AddWishlistAlbumFields = { ...rest, album_id: album_results.id }
    const results = await ctx.db.insert<AddWishlistAlbumFields, WishlistAlbum>("wishlist_albums", wishlist_album_input)

    return results

    //if (
    //    arg.input.album_input.tracks === undefined &&
    //    arg.input.album_input.artist_ids === undefined &&
    //    arg.input.album_input.producer_ids === undefined &&
    //    arg.input.album_input.genre_ids === undefined &&
    //    arg.input.album_input.label_ids === undefined
    //) return results

    // TODO: implement bulk inserts
};
