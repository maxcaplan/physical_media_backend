import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type {
    Genre,
    MutationResolvers,
    UpdateGenreInput
} from './../../../types.generated';

export const update_genre: NonNullable<MutationResolvers['update_genre']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.update<UpdateGenreInput, Genre>(
        "genres",
        arg.input,
        {
            conditional: new ConnectorCondition("id", "=", arg.input.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
