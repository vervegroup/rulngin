import applicationStore from "../../../app/redux/control/ApplicationStore";
import {resetEditor, rulePolicyChanged} from "../entity/EditorStoreSlice";
import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";
import {createRulePolicyAction, updateRulePolicyAction} from "./EditorApiClientActions.ts";

export const dispatchRulePolicyChanged = (rulePolicy: RulePolicy) => applicationStore.dispatch(rulePolicyChanged(rulePolicy))

export const dispatchCreateRulePolicyAction = (rulePolicy: RulePolicy) => applicationStore.dispatch(createRulePolicyAction(rulePolicy))

export const dispatchUpdateRulePolicyAction = (rulePolicy: RulePolicy) => applicationStore.dispatch(updateRulePolicyAction(rulePolicy))

export const dispatchResetEditor = () => applicationStore.dispatch(resetEditor())