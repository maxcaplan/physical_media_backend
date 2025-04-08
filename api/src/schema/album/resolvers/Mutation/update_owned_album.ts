import { ConnectorConditionOperator } from '../../../../connectors/connector';
import type {
    UpdateAlbumInput,
    Album,
    MutationResolvers,
    OwnedAlbum,
    UpdateOwnedAlbumInput
} from './../../../types.generated';

export const update_owned_album: NonNullable<MutationResolvers['update_owned_album']> = async (
    _parent,
    arg,
    ctx
) => {
    /** Update owned album */
    const { album_input, ...rest } = arg.input
    const owned_album_results = await ctx.db.update<Omit<UpdateOwnedAlbumInput, "album_input">, OwnedAlbum & { album_id: number }>(
        "owned_albums",
        { ...rest },
        {
            conditional: {
                lhs: "id",
                operator: ConnectorConditionOperator.EQUAL,
                rhs: arg.input.id
            }
        }
    )

    if (owned_album_results[0] === undefined) return Promise.resolve(null)

    /** Update album fields if updates suplied */
    const album_results = arg.input.album_input === undefined || arg.input.album_input === null ?
        null :
        await ctx.db.update<UpdateAlbumInput, Album>(
            "albums",
            arg.input.album_input,
            {
                conditional: {
                    lhs: "id",
                    operator: ConnectorConditionOperator.EQUAL,
                    rhs: owned_album_results[0].album_id
                }
            }
        )

    /** Get updated album if an update was done */
    const album = album_results === null || album_results[0] === undefined ?
        null :
        album_results[0]

    /** Return update results */
    if (owned_album_results[0] === undefined) return Promise.resolve(null)
    owned_album_results[0].album = album
    return owned_album_results[0]
};
