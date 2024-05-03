import {html, LitElement} from 'lit'

export default class BoundaryStaticElement extends LitElement {
  static shadowRootOptions = {...LitElement.shadowRootOptions, delegatesFocus: true}

  protected createRenderRoot(): HTMLElement | DocumentFragment {
    return this.renderTarget
  }

  render(): unknown {
    return this.view
  }

  updated(changedProperties: Map<string, unknown>): void {
    this.afterUpdate(changedProperties)
  }

  protected reRender(): void {
    this.requestUpdate()
  }

  protected get view(): unknown {
    return html`<H2>${this.constructor.name}</H2>`
  }

  protected get renderTarget(): HTMLElement | DocumentFragment {
    return this
  }

  protected afterUpdate(_changedProperties: Map<string, unknown>): void {
  }
}
