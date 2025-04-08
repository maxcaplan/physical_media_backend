import type { OwnedAlbum, QueryResolvers } from './../../../types.generated';

export const owned_albums: NonNullable<QueryResolvers['owned_albums']> = async (
    _parent,
    _arg,
    ctx
) => {
    const results = await ctx.db.select<OwnedAlbum>("owned_albums")
    return Promise.resolve(results)
};
