import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { MutationResolvers, ProducerAlbumRelation } from './../../../types.generated';

export const remove_producer_from_album: NonNullable<MutationResolvers['remove_producer_from_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<ProducerAlbumRelation>(
        "producers_albums",
        {
            conditional: new ConnectorCondition("producer_id", "=", arg.input.producer_id)
                .add("and", new ConnectorCondition("album_id", "=", arg.input.album_id))
        }
    )

    return Promise.resolve(results[0] || null)
};
