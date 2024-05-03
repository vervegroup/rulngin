import BoundaryDynamicElement from '../../../features/htmlelement/boundary/BoundaryDynamicElement.ts'
import { html } from 'lit'
import { appVersion } from '../../uiConfiguration/entity/app-config.ts'

class AppVersionElement extends BoundaryDynamicElement<string> {
  constructor () {
    super()
  }

  protected extractState (_reduxState: any): string {
    return appVersion()
  }

  protected get view (): any {
    return html`
      <code>${this.state}</code>
    `
  }
}

customElements.define('bq-app-version', AppVersionElement)
