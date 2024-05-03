import BoundaryDynamicElement from '../../../features/htmlelement/boundary/BoundaryDynamicElement.ts'
import { readAuthState, readIsLoggedIn } from '../control/AuthStateReaders.ts'
import { html } from 'lit'
import { navigate } from '../../navigation/control/Navigator.ts'
import { dispatchLogout } from '../control/AuthDispatchers.ts'
import oidcService from '../control/OidcService.ts'
import { type AuthState } from '../entity/AuthState.ts'

class AuthButtonElement extends BoundaryDynamicElement<AuthState> {
  constructor () {
    super()
  }

  protected get view (): any {
    if (readIsLoggedIn(this.state)) {
      return this._logoutView
    } else {
      return this._loginView
    }
  }

  private get _loginView (): any {
    return html`
      <button class="button is-info" @click=${(e: UIEvent) => { this.onLogin(e) }}>Login</button>
    `
  }

  private get _logoutView (): any {
    return html`
      <button class="button is-danger" @click=${(e: UIEvent) => { this.onLogout(e) }}>Logout</button>
    `
  }

  protected extractState (reduxState: any): AuthState {
    return readAuthState(reduxState)
  }

  private onLogout (_event: Event) {
    dispatchLogout()
    oidcService.logout().catch(e => { console.error(e) }).finally(() => navigate('/'))
  }

  private onLogin (event: Event) {
    event.stopPropagation()
    oidcService.login().catch(e => { console.error(e) })
  }
}

customElements.define('bq-auth-button', AuthButtonElement)
