import {EditorState} from "./EditorState.ts";
import {getEditorInitialState, policyEditorSlice} from "./EditorConstants.ts";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {extraReducers} from "../control/EditorApiClientActions.ts";
import {PropertyStatement} from "../../statement/entity/Statement.ts";
import {createRulePolicy, PolicyMetadata, RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";

export const fulfillState = (state: EditorState): void => {
  state.actionState = 'Fulfilled'
  state.errorMessage = undefined
}

const reducers = {
  rulePolicyChanged(state: EditorState, action: PayloadAction<RulePolicy>) {
    fulfillState(state)
    console.debug(policyEditorSlice, 'reducers', state, action, action.payload)
    state.state = {...action.payload}
  },
  policyStatementChanged(state: EditorState, action: PayloadAction<PropertyStatement>) {
    fulfillState(state)
    console.debug(policyEditorSlice, state, action, action.payload)
    const policy = state.state ?? createRulePolicy()
    policy.statement = action.payload
    state.state = policy
  },
  policyMetadataChanged(state: EditorState, action: PayloadAction<PolicyMetadata>) {
    fulfillState(state)
    console.debug(policyEditorSlice, state, action, action.payload)
    const policy = state.state ?? createRulePolicy()
    policy.metadata = action.payload
    state.state = policy
  },
  resetEditor(state: EditorState) {
    fulfillState(state)
    state.state = undefined
  },
  clearErrors(state: EditorState) {
    fulfillState(state)
  }
}

const initialState = getEditorInitialState()

const sliceOptions = {
  name: policyEditorSlice,
  initialState,
  reducers,
  extraReducers
}

const editorSlice = createSlice(sliceOptions)

export const {policyStatementChanged, policyMetadataChanged, rulePolicyChanged, resetEditor, clearErrors} = editorSlice.actions

export const editorReducer = editorSlice.reducer
