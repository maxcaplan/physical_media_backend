import type { Label, QueryResolvers } from './../../../types.generated';

export const labels: NonNullable<QueryResolvers['labels']> = async (
    _parent,
    _arg,
    ctx
) => {
    const results = await ctx.db.select<Label>("labels")
    return Promise.resolve(results)
};
