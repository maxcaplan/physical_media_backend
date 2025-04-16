import type { AddTrackInput, MutationResolvers, Track } from './../../../types.generated';

export const add_track: NonNullable<MutationResolvers['add_track']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<AddTrackInput, Track>("tracks", arg.input)
    return Promise.resolve(results)
};
