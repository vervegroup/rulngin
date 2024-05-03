import 'bulma/css/bulma.min.css'
import './app/redux/control/ApplicationStore.ts'
import './features/ElementRegistry.ts'
import './app/ElementRegistry.ts'
import oidcService from './app/auth/control/OidcService.ts'
import configurationService from './app/uiConfiguration/control/ConfigurationService.ts'
import {afterConfigurationFetched} from "./features/ElementRegistry.ts";
import {afterAppConfigurationFetched} from "./app/ElementRegistry.ts";


configurationService.load()
  .then(_ => oidcService.init())
  .then(async _ => await import('./app/navigation/control/ApplicationRouter.ts'))
  .then(_ => afterAppConfigurationFetched())
  .then(_ => afterConfigurationFetched())
  .then(_ => {
    const appInfo = `${configurationService.applicationName} - version ${configurationService.applicationVersion}`
    console.debug(`application (${appInfo}) initialisation completed!`)
    console.debug('uiConfiguration loaded', configurationService)
  })
