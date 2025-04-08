import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Artist, QueryResolvers } from './../../../types.generated';

export const artist: NonNullable<QueryResolvers['artist']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<Artist>(
        'artists',
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
