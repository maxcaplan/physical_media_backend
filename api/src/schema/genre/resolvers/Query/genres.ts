import type { Genre, QueryResolvers } from './../../../types.generated';

export const genres: NonNullable<QueryResolvers['genres']> = async (
    _parent,
    _arg,
    ctx
) => {
    const results = ctx.db.select<Genre>("genres")
    return Promise.resolve(results)
};
