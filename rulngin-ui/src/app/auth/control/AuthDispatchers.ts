import applicationStore from '../../redux/control/ApplicationStore.ts'
import { login, logout } from '../entity/AuthStoreSlice.ts'
import { type User } from 'oidc-client-ts'
import { type OidcData } from '../entity/OidcData.ts'

export const dispatchLoginUser = (user: User) => {
  const oidcData = {
    userProfile: {
      displayName: user.profile.name,
      email: user.profile.email,
      roles: user.profile.role,
      permissions: user.profile.permissions
    },
    rawAccessToken: user.access_token,
    tokenExpirationSeconds: user.expires_at,
    oidcData: JSON.parse(JSON.stringify(user))
  } as OidcData
  applicationStore.dispatch(login(oidcData))
}

export const dispatchLogout = () => {
  applicationStore.dispatch(logout())
}
