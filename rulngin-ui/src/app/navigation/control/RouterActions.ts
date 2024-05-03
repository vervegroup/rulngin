import oidcService from "../../auth/control/OidcService.ts";
import {ActionResult, Commands, Context} from "@vaadin/router";

export const redirectIfNotLoggedInAction = (_context: Context, _commands: Commands): Promise<ActionResult> => {
  return oidcService.getUser()
    .then(user => {
      return !(user?.expired ?? true)
    })
    .catch(error => {
      console.error('failed to check if user is logged in', error, oidcService)
    })
    .then(isLoggedIn => {
      console.debug(`Login Status: ${isLoggedIn}`)

      if (!isLoggedIn) {
        return oidcService.login().catch(e => {
          console.error(e)
        })
      } else {
        return undefined
      }
    })
}