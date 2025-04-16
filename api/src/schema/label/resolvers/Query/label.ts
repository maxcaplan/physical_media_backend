import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Label, QueryResolvers } from './../../../types.generated';

export const label: NonNullable<QueryResolvers['label']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.select<Label>(
        "labels",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
