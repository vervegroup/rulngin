import { appName, appRootUrl, appVersion } from '../entity/app-config.ts'
import {type AppConfig, BackendConfiguration, type OidcConfig} from '../entity/Configuration.ts'

const holder = {
  data: {
    applicationName: appName(),
    applicationVersion: appVersion(),
    applicationRootUrl: appRootUrl()
  }
}

export class ConfigurationService {
  private configuration?: AppConfig

  public async load (): Promise<unknown> {
    return await fetch(appRootUrl() + '/app/configuration.json')
      .then(async response => {
        if (!response.ok) {
          console.error('HTTP error ' + response.status, await response.text())
          throw new Error('Can not fetch configuration!')
        }
        return await response.json()
      })
      .then(json => {
        this.configuration = this.parseConfiguration(json)
        return JSON.parse(JSON.stringify(this.configuration)) as AppConfig
      })
  }

  private parseConfiguration (json: unknown): AppConfig {
    return json as AppConfig
  }

  public get oidcConfig (): OidcConfig {
    return this.configuration?.oidc ?? { clientId: '', issuer: '', redirectUri: '', scopes: [] }
  }

  public get backendConfig (): BackendConfiguration {
    return this.configuration?.backend ?? { baseUri: 'http://localhost:61080/api' }
  }

  get applicationName (): string {
    return holder.data.applicationName
  }

  get applicationVersion (): string {
    return holder.data.applicationVersion
  }
}

const configurationService = new ConfigurationService()

export default configurationService
