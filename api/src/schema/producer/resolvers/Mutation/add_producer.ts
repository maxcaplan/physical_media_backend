import type { AddProducerInput, MutationResolvers, Producer } from './../../../types.generated';

export const add_producer: NonNullable<MutationResolvers['add_producer']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<AddProducerInput, Producer>(
        "producers",
        arg.input
    )
    return Promise.resolve(results)
};
