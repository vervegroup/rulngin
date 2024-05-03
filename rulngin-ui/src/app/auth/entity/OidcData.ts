export type UserProfile = {
  displayName: string
  email: string
  roles: string[]
  permissions: string[]
}

export type OidcData = {
  userProfile: UserProfile
  rawAccessToken: string
  tokenExpirationSeconds: number
  oidcData: unknown
}
