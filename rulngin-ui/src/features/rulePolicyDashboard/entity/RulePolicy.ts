import {PropertyStatement} from "../../statement/entity/Statement.ts";
import {Cluster} from "../../rulePolicy/entity/Clusters.ts";
export type RulePolicyState = 'DE_ACTIVE' | 'ACTIVE'

export type PolicyMetadata = {
  createdByUserId: string;
  createdAt: string;
  modifiedByUserId: string;
  modifiedAt: string;
  cluster: Cluster;
  name: string;
  note: string;
  status: RulePolicyState;
}


export type RulePolicy = {
  id: string;
  metadata: PolicyMetadata | undefined;
  statement: PropertyStatement | undefined;
}

export const createRulePolicy = (
  id: string | undefined = undefined,
  newRootElement: PropertyStatement | undefined = undefined,
  metadata: PolicyMetadata | undefined = undefined,
  status: RulePolicyState | undefined
): RulePolicy => {
  return {
    id: id ?? undefined,
    statement: newRootElement,
    metadata,
    status: status ?? 'Draft'
  } as RulePolicy;
}
