import {ActionReducerMapBuilder, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
import {dashboardEditorSlice} from "../entity/DashboardConstants.ts";
import {getRulePolices} from "./DashboardApiClient.ts";
import {fulfillState} from "../entity/DashboardStoreSlice.ts";
import {DashboardState} from "../entity/DashboardState.ts";
import {RulePolicy} from "../../rulePolicy/entity/RulePolicy.ts";


export const getRulePolicesAction = createAsyncThunk(
  dashboardEditorSlice + "/rule-policies-get",
  async () => getRulePolices()
);

const addReducersForGetRulePolicesAction = (builder: ActionReducerMapBuilder<DashboardState>) => {
  builder.addCase(getRulePolicesAction.fulfilled, (state: DashboardState, action: PayloadAction<RulePolicy[]>) => {
    fulfillState(state)
    state.state = action.payload
  }).addCase(getRulePolicesAction.pending, (state: DashboardState, _action) => {
    state.actionState = "Pending";
  }).addCase(getRulePolicesAction.rejected, (state: DashboardState, action) => {
    state.actionState = "Error";
    state.errorMessage = action.error.message
  })
}


export const extraReducers = (builder: ActionReducerMapBuilder<DashboardState>) => {
  addReducersForGetRulePolicesAction(builder);
}