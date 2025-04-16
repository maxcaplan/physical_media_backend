import type { ArtistAlbumInput, ArtistAlbumRelation, MutationResolvers } from './../../../types.generated';

export const add_artist_to_album: NonNullable<MutationResolvers['add_artist_to_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<ArtistAlbumInput, ArtistAlbumRelation>(
        "artists_albums",
        arg.input
    )

    return Promise.resolve(results)
};
