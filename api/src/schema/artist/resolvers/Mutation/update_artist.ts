import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Artist, MutationResolvers, UpdateArtistInput } from './../../../types.generated';
export const update_artist: NonNullable<MutationResolvers['update_artist']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.update<UpdateArtistInput, Artist>(
        "artists",
        arg.input,
        {
            conditional: new ConnectorCondition("id", "=", arg.input.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
