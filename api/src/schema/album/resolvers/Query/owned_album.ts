import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { OwnedAlbum, QueryResolvers } from './../../../types.generated';
export const owned_album: NonNullable<QueryResolvers['owned_album']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<OwnedAlbum>(
        "owned_albums",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
