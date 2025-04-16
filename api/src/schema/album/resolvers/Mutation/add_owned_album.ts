import type { AddAlbumInput, AddOwnedAlbumInput, Album, MutationResolvers, OwnedAlbum } from './../../../types.generated';

type AddOwnedAlbumFields = Omit<AddOwnedAlbumInput, "album_input"> & { album_id: number }

export const add_owned_album: NonNullable<MutationResolvers['add_owned_album']> = async (
    _parent,
    arg,
    ctx) => {
    const album_results = await ctx.db.insert<AddAlbumInput, Album>("albums", arg.input.album_input)
    const { album_input, ...rest } = arg.input
    const owned_album_input: AddOwnedAlbumFields = { ...rest, album_id: album_results.id }
    const results = await ctx.db.insert<AddOwnedAlbumFields, OwnedAlbum>("owned_albums", owned_album_input)
    results.album = album_results
    return results
};
