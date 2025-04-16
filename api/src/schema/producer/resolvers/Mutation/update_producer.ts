import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { MutationResolvers, Producer, UpdateProducerInput } from './../../../types.generated';

export const update_producer: NonNullable<MutationResolvers['update_producer']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.update<UpdateProducerInput, Producer>(
        "producers",
        arg.input,
        {
            conditional: new ConnectorCondition("id", "=", arg.input.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
