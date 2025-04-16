import type { LabelAlbumInput, LabelAlbumRelation, MutationResolvers } from './../../../types.generated';

export const add_label_to_album: NonNullable<MutationResolvers['add_label_to_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<LabelAlbumInput, LabelAlbumRelation>(
        "labels_albums",
        arg.input
    )

    return results
};
