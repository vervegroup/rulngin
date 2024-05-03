import {getEditorInitialState, policyEditorSlice} from '../entity/EditorConstants'
import {EditorState} from '../entity/EditorState'
import {createRulePolicy, RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";


export const readEditorState = (state: any): EditorState => {
  if (typeof state === 'object' && !Array.isArray(state) && Object.keys(state).includes(policyEditorSlice)) {
    return state[policyEditorSlice] as EditorState
  } else {
    return getEditorInitialState()
  }
}

export const readRulePolicy = (state: EditorState): RulePolicy => {
  return state.state ?? createRulePolicy()
}
