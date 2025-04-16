import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Label, MutationResolvers } from './../../../types.generated';

export const delete_label: NonNullable<MutationResolvers['delete_label']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.delete<Label>(
        "labels",
        {
            conditional: new ConnectorCondition("id", "=", arg.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
