import { authSliceName, getAuthInitialState } from '../entity/AuthConstants.ts'
import { type AuthState } from '../entity/AuthState.ts'
import { type UserProfile } from '../entity/OidcData.ts'

export const readAuthState = (state: any) => {
  if (typeof state === 'object' && !Array.isArray(state) && Object.keys(state).includes(authSliceName)) {
    return state[authSliceName] as AuthState
  } else {
    return getAuthInitialState()
  }
}

export const readIsLoggedIn = (authState: AuthState | undefined): boolean => {
  if (authState?.state === undefined) {
    return false
  }

  const now = new Date()
  now.setTime(Date.now())

  return (authState.state.tokenExpirationSeconds * 1000) > now.getTime()
}

export const readUserProfile = (authState: AuthState | undefined): UserProfile | undefined => {
  return authState?.state?.userProfile
}

export const readDisplayName = (authState: AuthState | undefined): string | undefined => {
  return readUserProfile(authState)?.displayName ?? 'Unknown'
}

export const readUserPermissions = (authState: AuthState | undefined): string[] => {
  return authState?.state?.userProfile?.permissions ?? []
}
