import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { LabelAlbumRelation, MutationResolvers } from './../../../types.generated';

export const remove_label_from_album: NonNullable<MutationResolvers['remove_label_from_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<LabelAlbumRelation>(
        "labels_albums",
        {
            conditional: new ConnectorCondition("label_id", "=", arg.input.label_id)
                .add("and", new ConnectorCondition("album_id", "=", arg.input.album_id))
        }
    )

    return Promise.resolve(results[0] || null)
};
