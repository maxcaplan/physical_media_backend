import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Artist, OwnedAlbum, QueryResolvers } from './../../../types.generated';
export const owned_album: NonNullable<QueryResolvers['owned_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<OwnedAlbum>(
        "owned_albums",
        {
            conditional: new ConnectorCondition("id", "=", arg.id),
        }
    )

    return Promise.resolve(results[0] || null)
};
