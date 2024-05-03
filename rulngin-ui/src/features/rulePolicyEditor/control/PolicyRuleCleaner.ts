import {PropertyStatement} from "../../statement/entity/Statement.ts";

const removeStatementById = (existingRst: PropertyStatement, rulePolicyStatementId: string): PropertyStatement | undefined => {
  if (existingRst === undefined) {
    return undefined
  }

  if (existingRst.uiId !== rulePolicyStatementId) {
    return {...existingRst} as PropertyStatement
  }

  return undefined
}

const removeRulePolicyStatementById = (rulePolicy: PropertyStatement | undefined, rulePolicyStatementId: string): PropertyStatement | undefined => {
  if (rulePolicy === undefined) {
    return undefined
  }
  return removeStatementById(rulePolicy, rulePolicyStatementId);
}

export default removeRulePolicyStatementById