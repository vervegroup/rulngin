import {DashboardState} from "./DashboardState.ts";
import {dashboardEditorSlice, getDashboardInitialState} from "./DashboardConstants.ts";
import {createSlice} from "@reduxjs/toolkit";
import {extraReducers} from "../control/DashboardApiClientActions.ts";

export const fulfillState = (state: DashboardState): void => {
  state.actionState = 'Fulfilled'
  state.errorMessage = undefined
}

const reducers = {
  clearErrors(state: DashboardState) {
    fulfillState(state)
  }
}

const initialState = getDashboardInitialState()

const sliceOptions = {
  name: dashboardEditorSlice,
  initialState,
  reducers,
  extraReducers
}

const editorSlice = createSlice(sliceOptions)

export const {clearErrors} = editorSlice.actions

export const editorReducer = editorSlice.reducer
