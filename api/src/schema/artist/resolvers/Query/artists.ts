import type { Artist, QueryResolvers } from './../../../types.generated';
export const artists: NonNullable<QueryResolvers['artists']> = async (
    _parent,
    _arg,
    ctx
) => {
    const results = await ctx.db.select<Artist>("artists")
    return results
};
