import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { GenreAlbumRelation, MutationResolvers } from './../../../types.generated';

export const remove_genre_from_album: NonNullable<MutationResolvers['remove_genre_from_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<GenreAlbumRelation>(
        "genres_albums",
        {
            conditional: new ConnectorCondition("genre_id", "=", arg.input.genre_id)
                .add("and", new ConnectorCondition("album_id", "=", arg.input.album_id))
        }
    )

    return Promise.resolve(results[0] || null)
};
