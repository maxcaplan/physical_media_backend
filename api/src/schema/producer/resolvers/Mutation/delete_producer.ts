import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { MutationResolvers, Producer } from './../../../types.generated';

export const delete_producer: NonNullable<MutationResolvers['delete_producer']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<Producer>(
        "producers",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
