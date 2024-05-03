import { type AuthState } from './AuthState.ts'
import { authSliceName, getAuthInitialState } from './AuthConstants.ts'
import { extraReducers } from '../control/AuthApiClient.ts'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type OidcData } from './OidcData.ts'

const fulfillState = (state: AuthState): void => {
  state.actionState = 'Fulfilled'
  state.errorMessage = undefined
}

const reducers = {
  login (state: AuthState, payload: PayloadAction<OidcData>) {
    fulfillState(state)
    state.state = payload.payload
  },
  logout (state: AuthState) {
    fulfillState(state)
    state.state = undefined
  },
  clearErrors (state: AuthState) {
    fulfillState(state)
  }
}

const initialState = getAuthInitialState()

const sliceOptions = {
  name: authSliceName,
  initialState,
  reducers,
  extraReducers
}

const authSlice = createSlice(sliceOptions)

export const { logout, clearErrors, login } = authSlice.actions

export const authReducer = authSlice.reducer
