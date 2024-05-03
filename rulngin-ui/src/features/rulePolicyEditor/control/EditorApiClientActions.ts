import {EditorState} from "../entity/EditorState.ts";
import {ActionReducerMapBuilder, createAsyncThunk} from "@reduxjs/toolkit";
import {policyEditorSlice} from "../entity/EditorConstants.ts";
import {apiCreateRulePolicy, apiUpdateRulePolicy} from "./EditorApiClient.ts";
import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";
import {fulfillState} from "../entity/EditorStoreSlice.ts";


export const createRulePolicyAction = createAsyncThunk(
  policyEditorSlice + "/rule-policy-create",
  async (rulePolicy: RulePolicy) => apiCreateRulePolicy(rulePolicy)
);

const addReducersForCreateRulePolicyAction = (builder: ActionReducerMapBuilder<EditorState>) => {
  builder.addCase(createRulePolicyAction.fulfilled, (state, action) => {
    fulfillState(state)
    state.state = action.payload
  }).addCase(createRulePolicyAction.pending, (state, _action) => {
    state.actionState = "Pending";
  }).addCase(createRulePolicyAction.rejected, (state, action) => {
    state.actionState = "Error";
    state.errorMessage = JSON.parse(action.error.message ?? "{}")
  })
}


export const updateRulePolicyAction = createAsyncThunk(
  policyEditorSlice + "/rule-policy-update",
  async (rulePolicy: RulePolicy) => apiUpdateRulePolicy(rulePolicy)
);

const addReducersForUpdateRulePolicyAction = (builder: ActionReducerMapBuilder<EditorState>) => {
  builder.addCase(updateRulePolicyAction.fulfilled, (state, action) => {
    fulfillState(state)
    state.state = action.payload
  }).addCase(updateRulePolicyAction.pending, (state, _action) => {
    state.actionState = "Pending";
  }).addCase(updateRulePolicyAction.rejected, (state, action) => {
    state.errorMessage = action.error.message
  })
}


export const extraReducers = (builder: ActionReducerMapBuilder<EditorState>) => {
  addReducersForCreateRulePolicyAction(builder);
  addReducersForUpdateRulePolicyAction(builder);
}