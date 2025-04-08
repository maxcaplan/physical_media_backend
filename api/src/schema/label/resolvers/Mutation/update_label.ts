import { ConnectorCondition } from '../../../../connectors/connector_condition';
import type { Label, MutationResolvers, UpdateLabelInput } from './../../../types.generated';

export const update_label: NonNullable<MutationResolvers['update_label']> = async (
    _parent,
    arg,
    ctx
) => {
    const results = await ctx.db.update<UpdateLabelInput, Label>(
        "labels",
        arg.input,
        {
            conditional: new ConnectorCondition("id", "=", arg.input.id)
        }
    )

    if (results[0] === undefined) return Promise.resolve(null)
    return Promise.resolve(results[0])
};
