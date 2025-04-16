import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Genre, QueryResolvers } from './../../../types.generated';

export const genre: NonNullable<QueryResolvers['genre']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<Genre>(
        "genres",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
