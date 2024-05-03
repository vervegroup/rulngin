export type OidcConfig = {
  clientId: string
  issuer: string
  redirectUri: string
  scopes: string[]
}

export type BackendConfiguration = {
  baseUri: string
}

export type AppConfig = {
  oidc: OidcConfig
  backend: BackendConfiguration
}
