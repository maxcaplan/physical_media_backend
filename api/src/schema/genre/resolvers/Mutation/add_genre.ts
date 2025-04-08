import type {
    AddGenreInput,
    Genre,
    MutationResolvers
} from './../../../types.generated';

export const add_genre: NonNullable<MutationResolvers['add_genre']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<AddGenreInput, Genre>("genres", arg.input)
    return Promise.resolve(results)
};
