import type { Producer, QueryResolvers } from './../../../types.generated';

export const producers: NonNullable<QueryResolvers['producers']> = async (
    _parent,
    _arg,
    ctx
) => {
    const results = await ctx.db.select<Producer>("producers")
    return Promise.resolve(results)
};
