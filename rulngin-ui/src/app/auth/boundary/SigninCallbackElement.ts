import {navigate} from "../../navigation/control/Navigator.ts";
import {html} from "lit";
import oidcService from "../control/OidcService.ts";
import configurationService from "../../uiConfiguration/control/ConfigurationService.ts";
import {dispatchLoginUser} from "../control/AuthDispatchers.ts";
import BoundaryStaticElement from "../../../features/htmlelement/boundary/BoundaryStaticElement.ts";

class SigninCallbackElement extends BoundaryStaticElement {

  constructor() {
    super();
  }

  async connectedCallback() {
    super.connectedCallback();
    console.log("SigninCallbackElement connectedCallback");
    await configurationService.load().then(async _ => {
      await oidcService.init()
      await oidcService.createOrGetUserManager().signinCallback().then(async _ => {
        let data = await oidcService.getUser();
        if (data) {
          console.log("signinCallback", data.profile)
          dispatchLoginUser(data)
          navigate('/');
        } else {
          console.log("signinCallback", data)
        }
      });
    });
  }

  protected get view(): any {
    return html`<p>Processing signing-in callback</p>`;
  }
}

customElements.define('rn-signin-callback', SigninCallbackElement);