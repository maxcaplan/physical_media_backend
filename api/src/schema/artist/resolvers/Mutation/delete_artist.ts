import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Artist, MutationResolvers } from './../../../types.generated';

export const delete_artist: NonNullable<MutationResolvers['delete_artist']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<Artist>(
        "artists",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
