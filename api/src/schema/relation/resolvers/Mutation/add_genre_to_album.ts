import type { GenreAlbumInput, GenreAlbumRelation, MutationResolvers } from './../../../types.generated';

export const add_genre_to_album: NonNullable<MutationResolvers['add_genre_to_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<GenreAlbumInput, GenreAlbumRelation>(
        "genres_albums",
        arg.input
    )

    return results
};
