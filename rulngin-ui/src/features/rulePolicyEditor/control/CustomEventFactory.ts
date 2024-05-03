import {
  RESET_POLICY_EDITOR,
  SAVE_POLICY,
  UPDATE_POLICY_METADATA,
  UPDATE_POLICY_STATEMENT,
  UPDATE_RULE_POLICY
} from "../entity/CustomEvents";
import {PropertyStatement} from "../../statement/entity/Statement";
import {PolicyMetadata, RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";

export const createRulePolicyChangedEvent = (rulePolicy: RulePolicy): CustomEvent => {
  return new CustomEvent(
    UPDATE_RULE_POLICY,
    {
      detail: {
        rulePolicy
      },
      bubbles: true
    }
  )
}

export const createPolicyStatementChangedEvent = (propertyStatement: PropertyStatement | undefined): CustomEvent => {
  return new CustomEvent(
    UPDATE_POLICY_STATEMENT,
    {
      detail: {
        propertyStatement
      },
      bubbles: true
    }
  )
}

export const createPolicyMetadataChangedEvent = (policyMetadata: PolicyMetadata | undefined): CustomEvent => {
  return new CustomEvent(
    UPDATE_POLICY_METADATA,
    {
      detail: {
        policyMetadata
      },
      bubbles: true
    }
  )
}

export const createPolicySavedEvent = (rulePolicy: RulePolicy | undefined): CustomEvent => {
  return new CustomEvent(
    SAVE_POLICY,
    {
      detail: {
        rulePolicy
      },
      bubbles: true
    }
  )
}
export const createResetEditorEvent = (rulePolicy?: RulePolicy | undefined): CustomEvent => {
  return new CustomEvent(
    RESET_POLICY_EDITOR,
    {
      detail: {
        rulePolicy
      },
      bubbles: true
    }
  )
}