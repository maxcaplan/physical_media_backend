import type { Artist, AddArtistInput, MutationResolvers } from './../../../types.generated';

export const add_artist: NonNullable<MutationResolvers['add_artist']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<AddArtistInput, Artist>("artists", arg.input)
    return Promise.resolve(results)
};
