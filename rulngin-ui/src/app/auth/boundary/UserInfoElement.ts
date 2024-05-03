import BoundaryDynamicElement from '../../../features/htmlelement/boundary/BoundaryDynamicElement.ts'
import { html } from 'lit'
import { readAuthState, readDisplayName, readIsLoggedIn, readUserPermissions, readUserProfile } from '../control/AuthStateReaders.ts'
import { type AuthState } from '../entity/AuthState.ts'

class UserInfoElement extends BoundaryDynamicElement<AuthState> {
  constructor () {
    super()
  }

  protected get view (): any {
    if (!readIsLoggedIn(this.state)) {
      return html``
    }
    const userProfile = readUserProfile(this.state)
    if (readIsLoggedIn(this.state) && userProfile !== undefined) {
      const permissions = readUserPermissions(this.state) || []
      let permissionView: any

      if (permissions.length > 0) {
        permissionView = html`
          <div class="container">
            <p>Permission Set</p>
            <ul>
              ${this._getPermissionEntriesView(permissions)}
            </ul>
          </div>
        `
      }

      return html`
        <div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
                </figure>
              </div>
              <div class="media-content">
                <p class="title is-4">${readDisplayName(this.state)}</p>
                <p class="subtitle is-6">${userProfile.email}</p>
              </div>
            </div>

            <div class="content">
              <p class="container">User-ID: ${userProfile.email}</p>
              <br>
              ${permissionView}
            </div>
          </div>
        </div>
      `
    }
  }

  private _getPermissionEntriesView (permissions: string[] = []) {
    const permissionSet = new Set(permissions)
    return Array.from(permissionSet).sort().map(permission => html`<li><code>${permission}</code></li>`)
  }

  protected extractState (reduxState: any): AuthState {
    return readAuthState(reduxState)
  }
}

customElements.define('bq-user-info', UserInfoElement)
