import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Genre, MutationResolvers } from './../../../types.generated';

export const delete_genre: NonNullable<MutationResolvers['delete_genre']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<Genre>(
        "genres",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
