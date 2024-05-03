import { dispatchLogout } from './AuthDispatchers.ts'
import configurationService, { type ConfigurationService } from '../../uiConfiguration/control/ConfigurationService.ts'
import { type User, UserManager } from 'oidc-client-ts'

export class OidcService {
  private initialized: boolean = false
  private userManager: UserManager
  private readonly _configurationService: ConfigurationService

  constructor (configurationService: ConfigurationService) {
    this._configurationService = configurationService
    this.userManager = new UserManager({ authority: '', client_id: '', redirect_uri: '' })
  }

  async init (): Promise<void> {
    this.createOrGetUserManager()
    await Promise.resolve()
  }

  public createOrGetUserManager (): UserManager {
    if (!this.initialized) {
      const oidcConf = this._configurationService.oidcConfig
      console.debug('oidcConf', oidcConf)
      this.userManager = new UserManager({
        authority: oidcConf.issuer,
        client_id: oidcConf.clientId,
        redirect_uri: oidcConf.redirectUri + '/signin-callback',
        silent_redirect_uri: oidcConf.redirectUri + '/silent-callback.html'
      })
      this.initialized = true
    }
    return this.userManager
  }

  public async getUser (): Promise<User | null> {
    return await this.userManager.getUser()
  }

  public async login (): Promise<void> {
    await this.userManager.signinRedirect()
  }

  public async renewToken (): Promise<User | null> {
    return await this.userManager.signinSilent()
  }

  public async logout (): Promise<void> {
    dispatchLogout()
    await this.userManager.signoutRedirect()
  }

  async withToken<T>(tokenConsumer: (token: string) => Promise<T>): Promise<T> {
    console.debug('with token >> ')
    const executeTask = async (user: User | null): Promise<T> => {
      if (user?.access_token != null && (user.expires_at ?? 0) > Date.now() / 1000) {
        return await tokenConsumer(user.access_token)
      }
      throw new Error('User not logged in or token expired.')
    }

    try {
      const user = await this.getUser()
      if (user?.access_token != null && (user.expires_at ?? 0) > Date.now() / 1000) {
        return await executeTask(user)
      } else {
        await this.renewToken()
        return await executeTask(await this.getUser())
      }
    } catch (error) {
      console.error('Failed to refresh token:', error)
      throw error
    }
  }
}

const
  oidcService = new OidcService(configurationService)
export const
  withToken: <T>(consumer: (token: string) => Promise<T>) => Promise<T> = async (consumer) => await oidcService.withToken(consumer)
export const
  permissionKeyInToken: string = 'groups'
export default oidcService
