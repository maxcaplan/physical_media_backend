import { ConnectorConditionOperator } from '../../../../connectors/connector';
import type { Album, MutationResolvers, OwnedAlbum } from './../../../types.generated';

export const delete_owned_album: NonNullable<MutationResolvers['delete_owned_album']> = async (
    _parent,
    arg,
    ctx
) => {
    /** Delete owned album object */
    const owned_album_results = await ctx.db.delete<OwnedAlbum & { album_id: number }>(
        "owned_albums",
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: arg.id
            }
        }
    )

    if (owned_album_results[0] === undefined) return Promise.resolve(null)

    /** Delete album object associated with owned album object */
    const album_results = await ctx.db.delete<Album>(
        "albums",
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: owned_album_results[0].album_id
            }
        }
    )

    if (album_results[0] === undefined) return Promise.resolve(owned_album_results[0])
    owned_album_results[0].album = album_results[0]
    return Promise.resolve(owned_album_results[0])
};
