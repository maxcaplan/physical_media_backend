import type { MutationResolvers, ProducerAlbumInput, ProducerAlbumRelation } from './../../../types.generated';

export const add_producer_to_album: NonNullable<MutationResolvers['add_producer_to_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.insert<ProducerAlbumInput, ProducerAlbumRelation>(
        "producers_albums",
        arg.input
    )

    return results
};
