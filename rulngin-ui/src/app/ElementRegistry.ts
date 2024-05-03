import '../features/ElementRegistry.ts'
import './auth/boundary/AuthButtonElement.ts'
import './auth/boundary/UserInfoElement.ts'
import './auth/boundary/SigninCallbackElement.ts'
import './navigation/boundary/MainNavigationElement.ts'
import './site/boundary/AppVersionElement.ts'
import './site/boundary/RulNginAppElement.ts'
import routes from "./navigation/control/Routes.ts";
import applicationRouter from "./navigation/control/ApplicationRouter.ts";

export const afterAppConfigurationFetched = async () => {
  applicationRouter.setRoutes(routes)
    .then(_e => console.debug('router initialized with ', routes))
    .catch(e => console.error('router failed to initialize with ', routes, e))
}
