import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { ArtistAlbumRelation, MutationResolvers } from './../../../types.generated';

export const remove_artist_from_album: NonNullable<MutationResolvers['remove_artist_from_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<ArtistAlbumRelation>(
        "artists_albums",
        {
            conditional: new ConnectorCondition("artist_id", "=", arg.input.artist_id)
                .add("and", new ConnectorCondition("album_id", "=", arg.input.album_id))
        }
    )

    return Promise.resolve(results[0] || null)
};
