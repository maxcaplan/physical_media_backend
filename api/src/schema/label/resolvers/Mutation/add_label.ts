import type { AddLabelInput, Label, MutationResolvers } from './../../../types.generated';

export const add_label: NonNullable<MutationResolvers['add_label']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<AddLabelInput, Label>(
        "labels",
        arg.input
    )
    return Promise.resolve(results)
};
