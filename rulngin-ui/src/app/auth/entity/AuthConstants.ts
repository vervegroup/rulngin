import {AuthState} from "./AuthState.ts";

export const authSliceName : string = 'authenticationAndAuthorizationSlice';

export const getAuthInitialState = (): AuthState => ({
  actionState: "Fulfilled",
  state: undefined,
});
