import BoundaryDynamicElement from '../../../features/htmlelement/boundary/BoundaryDynamicElement.ts'
import { html } from 'lit'
import { appName } from '../../uiConfiguration/entity/app-config.ts'
import { navigationEntries } from '../control/Routes.ts'
import { readAuthState, readDisplayName, readIsLoggedIn } from '../../auth/control/AuthStateReaders.ts'

class MainNavigationElement extends BoundaryDynamicElement<unknown> {
  private readonly menuClassName: string
  private readonly menuItemClassName: string
  private readonly hasCallbackOnClick: string

  constructor () {
    super()
    this.menuClassName = 'navbarMainInHeader'
    this.menuItemClassName = 'navbar-item'
    this.hasCallbackOnClick = 'has-callback-on-click'
  }

  protected get view (): unknown {
    let me = html``
    const authState = readAuthState(this.state)
    if (readIsLoggedIn(authState)) {
      me = html`
        <a class="is-link" href="/me">
          ${readDisplayName(authState)}
        </a>
      `
    }
    return html`
      <nav class="navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <a class="navbar-item" href="#">${appName()}</a>

          <a role="button" class="navbar-burger ${this.menuClassName}" aria-label="menu" aria-expanded="false"
             data-target="navbarBasicExample"
             @click="${(e: UIEvent) => {
               this.burgerMenuClicked(e)
             }}">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a></div>

        <div id="navbarBasicExample" class="navbar-menu ${this.menuClassName}">
          <!-- Menu on the left-side -->
          <div class="navbar-start">${this.getNavigation()}</div>
          
          <div class="navbar-end">
            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  ${me}
                </div>
              </div>
              <div class="navbar-item">
                <div class="buttons">
                  <bq-auth-button data-with-register="true"></bq-auth-button>
                </div>
              </div>
            </div>
          </div>
          
        </div>

      </nav>
    `
  }

  getNavigation (): unknown {
    return navigationEntries.filter(r => r.visible ?? false).map(r => {
      return html`<a class="navbar-item" href="${r.path}">${r.name}</a>`
    })
  }

  burgerMenuClicked (_event: UIEvent) {
    const elementsByClassName = this.getElementsByClassName(this.menuClassName)
    console.debug(this.menuClassName, elementsByClassName)
    this.toggleMenuElements(elementsByClassName)

    const menuItems = this.querySelectorAll(`.navbar-menu .${this.menuItemClassName},.navbar-end .${this.menuItemClassName}`)
    console.debug(this.menuItemClassName, menuItems)
    for (let i = 0; i < menuItems.length; i++) {
      const el = menuItems.item(i)
      if (!el.classList.contains(this.hasCallbackOnClick)) {
        el.addEventListener('click', _ => {
          this.toggleMenuElements(elementsByClassName)
        })
        el.classList.add(this.hasCallbackOnClick)
      }
    }

    const brandMenuItem = this.querySelector(`.navbar-brand a.${this.menuItemClassName}`)
    if (brandMenuItem && !brandMenuItem.classList.contains(this.hasCallbackOnClick)) {
      brandMenuItem.addEventListener('click', _ => {
        for (let i = 0; i < elementsByClassName.length; i++) {
          const el = elementsByClassName.item(i)
          el?.classList.remove('is-active')
        }
        for (let i = 0; i < menuItems.length; i++) {
          const el = menuItems.item(i)
          el.classList.remove('is-active')
        }
      })
      brandMenuItem.classList.add(this.hasCallbackOnClick)
    }
  }

  toggleMenuElements (elements: HTMLCollectionOf<Element>) {
    for (let i = 0; i < elements.length; i++) {
      const el = elements.item(i)
      el?.classList.toggle('is-active')
    }
  }
}

customElements.define('bq-navigation', MainNavigationElement)
